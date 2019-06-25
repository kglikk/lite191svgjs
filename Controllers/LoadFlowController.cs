using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using lite191svgjs.Functions;

using lite191svgjs.Models;

using System.Numerics; //używam żeby korzystać z wartości zespolonych
//using lite.ViewModels;
using System.Collections;

namespace lite191svgjs.Controllers
{
    //[Produces("application/json")]
    //[Route("api/LoadFlowController")]
   // [Route("api/[controller]")] 
    public class LoadFlowController : Controller
    {

        // GET: api/values
        // [HttpGet("[action]")]
        [Route("api/LoadFlow/Calculate/{id:int}")]
        public IEnumerable<LoadFlowResult> Get([FromRoute] int id)
        {           
            //-------------Load Flow Algorithm---------------            
            //-----obliczenia wykonywane sa na jednostkach wzglednych
            List<int> buses = new List<int>();            
            int N_bus; //liczba szyn/wezlow
            int N_ser; //liczba elementow galeziowych
            double Sb = 100; //MVA moc bazowa
            double Ub = 60; //kV napiecie bazowe 
            double Zb = Math.Pow(Ub,2)/Sb; //Ohm impedancja bazowa
            double Yb = 1/Zb; //admitancja bazowa
            double Ib = Sb/(Math.Sqrt(3)*Ub)*1000; //A - prad bazowy
           
            //obliczenia wykonuj na danym projekcie
            ExternalGrid[] extgrids = _context.ExternalGrids.Where(m => m.ProjectId == id).ToArray();  
            OverheadLine[] ovheads = _context.OverheadLines.Where(m => m.ProjectId == id).ToArray();  
            TwoPhaseTransformer[] twophasetrafo = _context.TwoPhaseTransformers.Where(m => m.ProjectId == id).ToArray();  
            Bus[] busbars = _context.Buses.Where(m => m.ProjectId == id).ToArray();  
            /* 
            if (project == null)  
            {  
                return NotFound();  
            }
            */
  

            //Jesli nie istnieja tego typu elementy to oznacza sie numer szyny rowny 1 oraz wartosc zero w drugiej kolumnie.
            int[] shunts = new int[] { 1, 0 }; //elementy poprzeczne

            //int N_sh = 1; // liczba element�w poprzecznych 

            //pomocnicze tablice
            List<int> Is = new List<int>(); //numery szyn poczatkowych           
            List<int> Js = new List<int>(); // numery szyn koncowych
            List<string> Itype = new List<string>();           
            List<double> Pb = new List<double>();
            List<double> Qb = new List<double>();

            //Complex c1 = new Complex(1.2, 2.0);

            //ilosc elementow podluznych
            N_ser = ovheads.Count() + twophasetrafo.Count();

            //okresl ilosc szyn
            foreach (var row in extgrids)
            {
                if (!buses.Contains(row.NodeNo))
                {
                    buses.Add(row.NodeNo);
                }
                Itype.Add(row.NodeType);

                //obliczenia na podstawie jednostek wzglednych
                Pb.Add((row.ActivePower.HasValue) ? row.ActivePower.Value/Sb : 0);
                Qb.Add((row.ReactivePower.HasValue) ? row.ReactivePower.Value/Sb : 0);
            }
            foreach (var row in ovheads)
            {
                if (!buses.Contains(row.StartNodeNo))
                {
                    buses.Add(row.StartNodeNo);
                }
                if (!buses.Contains(row.EndNodeNo))
                {
                    buses.Add(row.EndNodeNo);
                }

                Is.Add(row.StartNodeNo);
                Js.Add(row.EndNodeNo);
            }
            N_bus = buses.Count;

            System.Diagnostics.Debug.WriteLine("BUS.COUNT: " + buses.Count);

            System.Diagnostics.Debug.WriteLine("ExternalGrid.COUNT: " + _context.ExternalGrids.Count());
            
            //uformuj macierz z elementami podluznymi - Series_pu
            Complex[,] Series_pu  = new Complex[N_ser, 5];
            
            int irow = 0;
            foreach (var row in ovheads)
            {
                Complex RX = new Complex(row.UnitaryResistance * row.Length, row.UnitaryReactance * row.Length);
                Complex B = new Complex(0, row.UnitaryCapacitance * row.Length);
                Series_pu[irow, 0] = row.StartNodeNo;
                Series_pu[irow, 1] = row.EndNodeNo;
                Series_pu[irow, 2] = RX/Zb;
                Series_pu[irow, 3] = B/(Yb*Math.Pow(10,6)); //przeliczenie z uS
                Series_pu[irow, 4] = 1; //TUTAJ BEDA PRZEKLADNIE TRANSFORMATOROW
                irow++;               
            }            
             
            foreach (var row in twophasetrafo){
                Complex RX = new Complex((row.LoadLossesRated * row.HVVoltageRated * row.HVVoltageRated)/(1000*row.ApparentPowerRated*row.ApparentPowerRated), row.ShortCircuitVoltage/100); //zastanow sie jak wyliczac parametry transformatora 
                Complex B = new Complex(0, 0);
                Series_pu[irow, 0] = row.HVNodeNo;
                Series_pu[irow, 1] = row.LVNodeNo;
                Series_pu[irow, 2] = RX/Zb;
                Series_pu[irow, 3] = B/Yb;
                irow++;  
            }
           
            double?[] sigma = new double?[N_bus];

            //uformuj macierz - buses
            foreach (var row in extgrids)
            {              
                sigma[row.NodeNo] = row.VoltageAngle; //row.ID-1
            }

            double[] U = new double[N_bus];
            double[] Upu = new double[N_bus];

            //uformuj macierz - U 
            foreach (var row in busbars)
            {
                Upu[row.NodeNo] = row.NominalVoltage/Ub; //row.ID-1                
            }

             
            /* 
            //wartosci napiec z bezwglednych na wzgledne           
             
            for (int c = 0; c <= (U.Length-1); c++)
            {
                Upu[c] = U[c] / Ub; 
            }
            */

            double[] normalSigma = new double[N_bus];
            for (int n = 0; n <= (N_bus - 1); n++)
            {
                normalSigma[n] = (sigma[n].HasValue) ? sigma[n].Value : 0; //przekonwertowanie double? na double
            }            

            //uformuj macierz admitancyjna
            Complex[,] Ybus = new Complex[N_bus, N_bus];
            Ybus = formYmatrix(N_bus, N_ser, Is, Js, Series_pu, shunts);

            //oblicz macierz Jacobiego
            double[,] Jac = new double[N_bus+1, N_bus+1];
            Jac = calcJacobiMatrix(N_bus, Ybus, Upu, normalSigma, Itype);            
            
            //odwroc macierz Jacobiego
            double[,] JacInv = new double[Jac.GetLength(0),Jac.GetLength(1)];
            JacInv = MatrixInverseFunc.Main(Jac);            
            
            int maxIter = 25; //maksymalna liczba iteracji
            double lambda = 1; //acceleration coefficient. This coefficient takes values less than one and improves the convergence characteristics of the problem.  The user may change the value of l to see its effect on the mismatch at the end of the iterations.
            for(int i= 0; i <= (maxIter-1); i++)
            {
                for (int m = 1; m <= (N_bus - 1); m++)
                {                    
                    Upu[m] = Upu[m] + deltaV(m, N_bus, Itype, JacInv, Ybus, normalSigma, Upu, Pb, Qb) * lambda;
                   
                    normalSigma[m] = normalSigma[m] + deltaSigma(m, N_bus, Itype, JacInv, Ybus, normalSigma, Upu, Pb, Qb) * lambda;
                    //System.Diagnostics.Debug.WriteLine("m " + m + "normalSigma[m]" + normalSigma[m]);
                    //System.Diagnostics.Debug.WriteLine("m " + m + "deltaSigma" + deltaSigma(m, N_bus, Itype, JacInv, Ybus, normalSigma, U, Pb, Qb));
                }
            }

           //z wartosci wzglednych na bezwzgledne
            for (int m = 0; m<=(Upu.Length-1); m++)
            {
                U[m] = Upu[m] * Ub; 
            }

            //obliczanie strat mocy na poszczególnych gałeziach
            double[] Ploss = new double[N_bus];
            Ploss =  activePowerLoss(Upu, normalSigma, Series_pu, N_bus, Is, Js, Sb);
            double[] Qloss = new double[N_bus];
            Qloss =  reactivePowerLoss(Upu, normalSigma, Series_pu, N_bus, Is, Js, Sb);
        
         

            //prąd wpywajacy od wezla i i doplywajacy do wezla j
            Complex[] IloadI = new Complex[N_bus];
            IloadI = Iload_i(Upu, normalSigma, Series_pu, N_bus, Is, Js, Ib);
            Complex[] IloadJ = new Complex[N_bus];
            IloadJ = Iload_j(Upu, normalSigma, Series_pu, N_bus, Is, Js, Ib);

            int[] busStart_I = new int[N_bus];
            busStart_I = busStartI(N_bus,Is);
            int[] busEnd_J = new int[N_bus];
            busEnd_J = busEndJ(N_bus,Js);



            //radian to degree
            double[] normalSigmaDegrees = new double[N_bus];
            for (int c = 0; c<=(normalSigma.Length-1); c++)
            {
                normalSigmaDegrees[c] = normalSigma[c] * (180.0 / Math.PI); 
            }

            var list = new LoadFlows();

            list.Results = new List<LoadFlowResult>();            
            for (int z = 0; z <= (N_bus - 1); z++)
            {
                var a = new LoadFlowResult() { busNo = z, resultU = U[z], resultUpu = Upu[z], resultSigma = normalSigmaDegrees[z], resultPloss = Ploss[z], resultQloss = Qloss[z], resultIload_i = IloadI[z].Magnitude, resultIload_j = IloadJ[z].Magnitude, busNoStart = busStart_I[z], busNoEnd = busEnd_J[z]   };
                list.Results.Add(a);          
            }
            return list.Results;           
        }


        class LoadFlows : IEnumerable<LoadFlowResult>
        {
            public List<LoadFlowResult> Results { get; set; }
            

            public IEnumerator<LoadFlowResult> GetEnumerator()
            {                
                return Results.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {                
                return Results.GetEnumerator();
            }
        }

        public class LoadFlowResult
        {           
            public int busNo { get; set; }
            public double resultU { get; set; }
            public double resultUpu { get; set; }
            public double resultSigma { get; set; } 
            public double resultPloss {get; set; }
            public double resultQloss {get;set;}
            public int busNoStart {get;set;}
            public int busNoEnd {get;set;}
            public double resultIload_i {get;set;}
            public double resultIload_j {get;set;}
                  
        }


        private readonly DataContext _context;

        public LoadFlowController(DataContext context)
        {
            _context = context;
        }

        static Complex[,] formYmatrix(int N_bus, int N_ser, List<int> Is, List<int> Js, Complex[,] Series_pu, int[] shunts)
        {
            //inicjalizuj macierz admitancyjn�
            Complex[,] Ybus = new Complex[N_bus, N_bus];
            Array.Clear(Ybus, 0, Ybus.Length);

            //uformuj macierz admitancyjn�
            for (int m = 0; m <= (N_bus - 1); m++)
            {
                Ybus[Is[m], Is[m]] = Ybus[Is[m], Is[m]] + Series_pu[m, 3] + 1 / Series_pu[m, 2];
                Ybus[Is[m], Js[m]] = Ybus[Is[m], Js[m]] - (1 / Series_pu[m, 2]) * Series_pu[m, 4];
                Ybus[Js[m], Is[m]] = Ybus[Js[m], Is[m]] - (1 / Series_pu[m, 2]) * Series_pu[m, 4];
                Ybus[Js[m], Js[m]] = Ybus[Js[m], Js[m]] + Series_pu[m, 3] + (1 / Series_pu[m, 2]) * Series_pu[m, 4] * Series_pu[m, 4];
            }

            //dodaj elementy poprzeczne TUTAJ TRZEBA COS POPRAWIC
            /*
            for (int m = 0; m <= (shunts.Length - 1); m++)
            {
                Ybus[Is[m], Is[m]] = Ybus[Is[m], Is[m]] + shunts[m];
                Ybus[Is[m], Is[m]] = Ybus[Js[m], Js[m]] + shunts[m];
            }*/
            return Ybus;
        }
        
        static double[,] calcJacobiMatrix(int N_bus, Complex[,] Ybus, double[] U, double[] normalSigma, List<string> Itype)
        {
            //uformuj macierz Jacobiego
            double[,] Jac = new double[N_bus+1, N_bus + 1];

            for (int k = 1; k <= (N_bus - 1); k++)
            {
                for (int n = 1; n <= (N_bus - 1); n++)
                {
                    // d(fp_k)/d(V_n)     
                    Jac[k - 1, n + N_bus - 2] = U[k] * Ybus[k, n].Magnitude * Math.Cos(Ybus[k, n].Phase + normalSigma[n] - normalSigma[k]);
                   // System.Diagnostics.Debug.WriteLine("Jac[k - 1,n + N_bus - 2] " + Jac[k - 1, n + N_bus - 2]);

                    // d(fq_k)/d(V_n)  
                    Jac[k + N_bus - 2, n + N_bus - 2] = (-U[k]) * Ybus[k, n].Magnitude * Math.Sin(Ybus[k, n].Phase + normalSigma[n] - normalSigma[k]);
                   // System.Diagnostics.Debug.WriteLine("Jac[k + N_bus - 2, n + N_bus - 2] " + Jac[k + N_bus - 2, n + N_bus - 2]);

                    // d(fp_k)/d(sigma_n)
                    Jac[k - 1, n - 1] = -(U[k] * U[n] * Ybus[k, n].Magnitude) * Math.Sin(Ybus[k, n].Phase + normalSigma[n] - normalSigma[k]);
                   // System.Diagnostics.Debug.WriteLine("Jac[k - 1, n - 1] " + Jac[k - 1, n - 1]);

                    // d(fq_k)/d(sigma_n)
                    Jac[k + N_bus - 2, n - 1] = (-U[k]) * U[n] * Ybus[k, n].Magnitude * Math.Cos(Ybus[k, n].Phase + normalSigma[n] - normalSigma[k]);
                   // System.Diagnostics.Debug.WriteLine("Jac[k + N_bus - 2, n - 1]" + Jac[k + N_bus - 2, n - 1]);
                   
                }
            }

            for (int k = 1; k <= (N_bus - 1); k++)
            {                
                    // d(fp_k)/d(V_k)  
                    Jac[k - 1, k + N_bus - 2] = summationJacobi_fpkVk(k, N_bus, Ybus, U, normalSigma) + U[k] * Ybus[k, k].Magnitude * Math.Cos(Ybus[k, k].Phase);
                    //System.Diagnostics.Debug.WriteLine("k: " + k + "i: " + i + "Ybus[k, i].Magnitude" + Ybus[k, i].Magnitude); 
                    
                    // d(fq_k)/d(V_k)                        
                    Jac[k + N_bus - 2,k + N_bus - 2] = summationJacobi_fqkVk(k, N_bus, Ybus, U, normalSigma) - (U[k] * Ybus[k, k].Magnitude * Math.Sin(Ybus[k, k].Phase));
                   // System.Diagnostics.Debug.WriteLine(" Jac[k + N_bus - 2,k + N_bus - 2] " + Jac[k + N_bus - 2, k + N_bus - 2]);


                    // d(fp_k)/d(sigma_k)
                    Jac[k - 1,k - 1] = summationJacobi_fpkSigmak(k, N_bus, Ybus, U, normalSigma) - U[k] * U[k] * Ybus[k, k].Magnitude * Math.Sin(Ybus[k, k].Phase);
                   // System.Diagnostics.Debug.WriteLine("Jac[k - 1,k - 1] " + Jac[k - 1, k - 1]);

                    // d(fq_k)/d(sigma_k)
                    Jac[k + N_bus - 2, k - 1] = summationJacobi_fqkSigmak(k, N_bus, Ybus, U, normalSigma) - U[k] * U[k] * Ybus[k, k].Magnitude * Math.Cos(Ybus[k, k].Phase);
                   // System.Diagnostics.Debug.WriteLine("Jac[k + N_bus - 2, k - 1] " + Jac[k + N_bus - 2, k - 1]);
                    // System.Diagnostics.Debug.WriteLine("Math.Cos(Ybus[k, n] " + Math.Cos(Ybus[k, n].Phase));
                    // System.Diagnostics.Debug.WriteLine("Math.Sin(Ybus[k, n] " + Math.Sin(Ybus[k, n].Phase));
            }

            for (int k = 1; k <= (N_bus - 1); k++)
            {
                for (int n = 1; n <= (N_bus - 1); n++)
                {

                    if (Itype[n] == "PV") //SL odpowiada 0, PV odpowiada 1, PQ odpowiada 2
                    {
                        Jac[k - 1, n + N_bus - 2] = 0;
                        Jac[k + N_bus - 2, n + N_bus - 2] = 0;
                    }

                    if (Itype[k] == "PV") //SL odpowiada 0, PV odpowiada 1, PQ odpowiada 2
                    {
                        Jac[k + N_bus - 2, n - 1] = 0;
                        Jac[k + N_bus - 2, n + N_bus - 2] = 0;
                        Jac[k + N_bus - 2, k + N_bus - 2] = 1;
                    }
                }
            }
                /*
                double[,] matrixReplacement = new double[,] { { 594.507, -395.122, 0, -0.732 }, { -395.122, 885.659, 0, 1.867 }, { 0, 0, 1, 0 }, { 43.902, -112.033, 0, 14.761 } };
                return matrixReplacement;
                */
                return Jac;
        }

        //sumowania w jakobianie
        static double summationJacobi_fpkVk(int k, int N_bus, Complex[,] Ybus, double[] U, double[] normalSigma)
        {
            double[] summation = new double[N_bus];
            double result = 0;
            for (int i = 0; i <= (N_bus - 1); i++)
                {
                   summation[i] = U[i] * Ybus[k, i].Magnitude * Math.Cos(Ybus[k, i].Phase + normalSigma[i] - normalSigma[k]);
                }
           result = summation.Sum();            
           return result;
        }

        static double summationJacobi_fqkVk(int k, int N_bus, Complex[,] Ybus, double[] U, double[] normalSigma)
        {
            double[] summation = new double[N_bus];
            double result = 0;
            for (int i = 0; i <= (N_bus - 1); i++)
            {
                summation[i] = (-U[i]) * Ybus[k, i].Magnitude * Math.Sin(Ybus[k, i].Phase + normalSigma[i] - normalSigma[k]);
            }
            result = summation.Sum();
            return result;           
        }
        static double summationJacobi_fpkSigmak(int k, int N_bus, Complex[,] Ybus, double[] U, double[] normalSigma)
        {
            double[] summation = new double[N_bus];
            double result = 0;
            for (int i = 0; i <= (N_bus - 1); i++)
            {
                summation[i] = U[k] * U[i] * Ybus[k, i].Magnitude * Math.Sin(Ybus[k, i].Phase + normalSigma[i] - normalSigma[k]);
            }
            result = summation.Sum();
            return result;            
        }

        static double summationJacobi_fqkSigmak(int k, int N_bus, Complex[,] Ybus, double[] U, double[] normalSigma)
        {
            double[] summation = new double[N_bus];
            double result = 0;
            for (int i = 0; i <= (N_bus - 1); i++)
            {
                summation[i] = U[k] * U[i] * Ybus[k, i].Magnitude * Math.Cos(Ybus[k, i].Phase + normalSigma[i] - normalSigma[k]);
            }
            result = summation.Sum();
            return result;            
        }
         
        //funkcja mocy czynnej
        static double fp(int k, double[] x, double[] y, int N_bus, Complex[,] Ybus)
        {
            double[] summation = new double[N_bus];
            double result = 0;
            
                for (int i = 0; i <= (N_bus - 1); i++)
                {
                summation[i] = x[k] * x[i] * Ybus[k, i].Magnitude * Math.Cos(Ybus[k, i].Phase + y[i] - y[k]);
                //System.Diagnostics.Debug.WriteLine("Math.Cos(Ybus[k, i].Phase) " + Math.Cos(Ybus[k, i].Phase)); 
            }

            result = summation.Sum();
            return result;
        }

        //funkcja mocy biernej
        static double fq(int k,  double[] x, double[] y, int N_bus, Complex[,] Ybus)
        {
            double[] summation = new double[N_bus];
            double result = 0;

            for (int i = 0; i <= (N_bus - 1); i++)
                {
                summation[i] = -(x[k] * x[i] * Ybus[k, i].Magnitude * Math.Sin(Ybus[k, i].Phase + y[i] - y[k]));                    
                }

            result = summation.Sum();
            return result;
        }

        //poprawki napiecia
        static double deltaV(int m,  int N_bus, List<string> Itype, double[,] JacInv, Complex[,] Ybus, double[] normalSigma, double[] U, List<double> Pb, List<double> Qb)
        {
            double result = 0;
           // double[] summationDeltaV = new double[N_bus];
            List<double> summationDeltaV = new List<double>();

            for (int k = 1; k <= (N_bus-1); k++)
            {                               
                    if (Itype[k] == "PV")
                    {
                    summationDeltaV.Add(JacInv[m + N_bus - 2, k - 1] * (Pb[k] - fp(k, U, normalSigma, N_bus, Ybus)));
                    //   summationDeltaV[k] = JacInv[m + N_bus - 2,k - 1] * (Pb[k] - fp(k,U, normalSigma, N_bus, Ybus)) + JacInv[m + N_bus - 2,k + N_bus - 2] * 0;                       
                    }
                    else
                    {
                    summationDeltaV.Add(JacInv[m + N_bus - 2, k - 1] * (Pb[k] - fp(k, U, normalSigma, N_bus, Ybus)) + JacInv[m + N_bus - 2, k + N_bus - 2] * (Qb[k] - fq(k, U, normalSigma, N_bus, Ybus)));
                    //summationDeltaV[k] = JacInv[m + N_bus - 2,k - 1] * (Pb[k] - fp(k,U, normalSigma, N_bus, Ybus)) + JacInv[m + N_bus - 2,k + N_bus - 2] * (Qb[k] - fq(k,U, normalSigma, N_bus, Ybus));                       
                    }                                       
                
            }
            result = summationDeltaV.Sum();


            //System.Diagnostics.Debug.WriteLine("summationDeltaV.Count" + summationDeltaV.Count);
            return result;
        }

        //poprawki kata
        static double deltaSigma(int m, int N_bus, List<string> Itype, double[,] JacInv, Complex[,] Ybus, double[] normalSigma, double[] U, List<double> Pb, List<double> Qb)
        {
            double result = 0;
            List<double> summationDeltaSigma = new List<double>();

            for (int k = 1; k <= (N_bus - 1); k++)
            {
                    if (Itype[k] == "PV")
                    {
                    summationDeltaSigma.Add(JacInv[m - 1, k - 1] * (Pb[k] - fp(k, U, normalSigma, N_bus, Ybus)));
                    }
                    else
                    {
                    summationDeltaSigma.Add(JacInv[m - 1,k - 1] * (Pb[k] - fp(k,U, normalSigma, N_bus, Ybus) + JacInv[m - 1,k + N_bus - 2] * (Qb[k] - fq(k,U, normalSigma, N_bus, Ybus))));
                    }                                  
            }
            result = summationDeltaSigma.Sum();
           
            return result;           
        }

        //straty mocy czynnej
        static double[] activePowerLoss(double[] U, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, List<int> Js, double Sb)
        {

            double[] resultToFrom = new double[N_bus];
            double[] resultFromTo = new double[N_bus];
            double[] result = new double[N_bus];
            
            Complex ys, ysh;  //odwrotność impedancji elementu podłużnego i poprzecznego
            
            //List<double> summationDeltaSigma = new List<double>();
          
            for (int i = 0; i <= (N_bus - 1); i++)
            {

                ys = 1/(Series_pu[i,2]); //odwrotność impedancji elementu podłużnego
                ysh = Series_pu[i,3]; //impedancja elementu poprzecznego

                //ysh.Phase w przypadku 0 wyrzuca błąd
                if(ysh.Magnitude == 0){                     
                    resultToFrom[i] = -( U[Js[i]] * U[Is[i]] * ys.Magnitude * Math.Cos(ys.Phase + normalSigma[Is[i]] - normalSigma[Js[i]] )) + Math.Pow(U[Is[i]],2) * ys.Magnitude * Math.Cos(ys.Phase); 
                    resultFromTo[i] = -( U[Js[i]] * U[Is[i]] * ys.Magnitude * Math.Cos(ys.Phase + normalSigma[Js[i]] - normalSigma[Is[i]] )) + Math.Pow(U[Js[i]],2) * ys.Magnitude * Math.Cos(ys.Phase);
                }
                else {
                    resultToFrom[i] = -( U[Js[i]] * U[Is[i]] * ys.Magnitude * Math.Cos(ys.Phase + normalSigma[Is[i]] - normalSigma[Js[i]] )) + Math.Pow(U[Is[i]],2) * ys.Magnitude * Math.Cos(ys.Phase) +  Math.Pow(U[Is[i]],2)* ysh.Magnitude * Math.Cos(ysh.Phase); 
                    resultFromTo[i] = -( U[Js[i]] * U[Is[i]] * ys.Magnitude * Math.Cos(ys.Phase + normalSigma[Js[i]] - normalSigma[Is[i]] )) + Math.Pow(U[Js[i]],2) * ys.Magnitude * Math.Cos(ys.Phase) +  Math.Pow(U[Js[i]],2)* ysh.Magnitude * Math.Cos(ysh.Phase);                  
                }               
                
                result[i] = (resultToFrom[i] + resultFromTo[i])*Sb;                
            }            
           
            return result;           
        }

        //straty mocy biernej
        static double[] reactivePowerLoss(double[] U, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, List<int> Js, double Sb)
        {

            double[] resultToFrom = new double[N_bus];
            double[] resultFromTo = new double[N_bus];
            double[] result = new double[N_bus];
            
            Complex ys, ysh;  //odwrotność impedancji elementu podłużnego i poprzecznego
            
            //List<double> summationDeltaSigma = new List<double>();
          
            for (int i = 0; i <= (N_bus - 1); i++)
            {

                ys = 1/(Series_pu[i,2]); //odwrotność impedancji elementu podłużnego
                ysh = Series_pu[i,3]; //impedancja elementu poprzecznego

                //ysh.Phase w przypadku 0 wyrzuca błąd
                if(ysh.Magnitude == 0){                     
                    resultToFrom[i] =  U[Is[i]] * U[Js[i]] * ys.Magnitude * Math.Sin(ys.Phase + normalSigma[Is[i]] - normalSigma[Js[i]] ) - Math.Pow(U[Js[i]],2) * ys.Magnitude * Math.Sin(ys.Phase); 
                    resultFromTo[i] =  U[Is[i]] * U[Js[i]] * ys.Magnitude * Math.Sin(ys.Phase + normalSigma[Js[i]] - normalSigma[Is[i]] ) - Math.Pow(U[Is[i]],2) * ys.Magnitude * Math.Sin(ys.Phase);
                }
                else {
                    resultToFrom[i] =  U[Is[i]] * U[Js[i]] * ys.Magnitude * Math.Sin(ys.Phase + normalSigma[Is[i]] - normalSigma[Js[i]] ) - Math.Pow(U[Js[i]],2) * ys.Magnitude * Math.Sin(ys.Phase) - Math.Pow(U[Js[i]],2) * ysh.Magnitude * Math.Sin(ysh.Phase); 
                    resultFromTo[i] =  U[Is[i]] * U[Js[i]] * ys.Magnitude * Math.Sin(ys.Phase + normalSigma[Js[i]] - normalSigma[Is[i]] ) - Math.Pow(U[Is[i]],2) * ys.Magnitude * Math.Sin(ys.Phase) - Math.Pow(U[Is[i]],2) * ysh.Magnitude * Math.Sin(ysh.Phase);                  
                }               
                
                result[i] = (resultToFrom[i] + resultFromTo[i])*Sb;                
            }            
           
            return result;           
        }

        //prad w galezi
        static Complex[] I_ij(double[] Upu, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, List<int> Js, double Ib)
        {
            Complex[] result = new Complex[N_bus];
          //  Complex[,] Ucomplex = new Complex[N_bus, 1];

            for (int m = 0; m <= (N_bus - 1); m++)
            {
               Complex Ucomplex_i = new Complex(Upu[Is[m]]*Math.Cos(normalSigma[Is[m]]), Upu[Is[m]]*Math.Sin(normalSigma[Is[m]]) );
               Complex Ucomplex_j = new Complex(Upu[Js[m]]*Math.Cos(normalSigma[Js[m]]), Upu[Js[m]]*Math.Sin(normalSigma[Js[m]]) );
               Complex R = Series_pu[m,2];
               result[m] = ((Ucomplex_i-Ucomplex_j)/R)*Ib;  
            }
            return result;
        }

        //prad ladowania od strony i
        static Complex[] Icharge_i(double[] U, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, double Ib)
        {
            Complex[] result = new Complex[N_bus];
          //  Complex[,] Ucomplex = new Complex[N_bus, 1];

            for (int m = 0; m <= (N_bus - 1); m++)
            {
               Complex Ucomplex_i = new Complex(U[Is[m]]*Math.Cos(normalSigma[Is[m]]), U[Is[m]]*Math.Sin(normalSigma[Is[m]]) );              
               Complex B = Series_pu[m,3];
               result[m] = ((B/2) * Ucomplex_i)*Ib;
            }
            return result;
        }

        //prad ladowania od strony j
        static Complex[] Icharge_j(double[] U, double[] normalSigma, Complex[,] Series_pu, int N_bus,  List<int> Js, double Ib)
        {
            Complex[] result = new Complex[N_bus];
            //Complex[,] Ucomplex = new Complex[N_bus, 1];

            for (int m = 0; m <= (N_bus - 1); m++)
            {
               Complex Ucomplex_j = new Complex(U[Js[m]]*Math.Cos(normalSigma[Js[m]]), U[Js[m]]*Math.Sin(normalSigma[Js[m]]) );              
               Complex B = Series_pu[m,3];
               result[m] = ((B/2) * Ucomplex_j)*Ib;
            }
            return result;
        }

         //prad wplywajacy do wezla i
        static Complex[] Iload_i(double[] Upu, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, List<int> Js, double Ib)
        {
            Complex[] resultChargeI = new Complex[N_bus];
            Complex[] resultI_ij = new Complex[N_bus];
            

            Complex[] result = new Complex[N_bus];
          //  Complex[,] Ucomplex = new Complex[N_bus, 1];

            resultChargeI = Icharge_i(Upu, normalSigma, Series_pu, N_bus, Is,Ib);
            resultI_ij = I_ij(Upu, normalSigma, Series_pu, N_bus, Is, Js, Ib);

            for (int m = 0; m <= (N_bus - 1); m++)
            {               
               result[m] = ((resultI_ij[m] + resultChargeI[m])/1000).Magnitude;             

            }
            return result; // wartosc bezwzglednia
        }

        //prad wplywajacy do wezla j
        static Complex[] Iload_j(double[] Upu, double[] normalSigma, Complex[,] Series_pu, int N_bus, List<int> Is, List<int> Js, double Ib)
        {
            Complex[] resultChargeJ = new Complex[N_bus];
            Complex[] resultI_ij = new Complex[N_bus];
            

            Complex[] result = new Complex[N_bus];
          //  Complex[,] Ucomplex = new Complex[N_bus, 1];

            resultChargeJ = Icharge_j(Upu, normalSigma, Series_pu, N_bus, Js, Ib);
            resultI_ij = I_ij(Upu, normalSigma, Series_pu, N_bus, Is, Js, Ib);

            for (int m = 0; m <= (N_bus - 1); m++)
            {               
               result[m] = ((resultI_ij[m] - resultChargeJ[m])/1000).Magnitude;               

            }
            return result; // wartosc bezwzgledna
        }
                
        static int[] busStartI(int N_bus, List<int> Is)
        {
              int[] result = new int[N_bus];
         
            for (int m = 0; m <= (N_bus - 1); m++)
            {               
               result[m] = Is[m];
            }
            return result;
        }
        
        static int[] busEndJ(int N_bus, List<int> Js)
        {
              int[] result = new int[N_bus];
          //  Complex[,] Ucomplex = new Complex[N_bus, 1];

            for (int m = 0; m <= (N_bus - 1); m++)
            {               
               result[m] = Js[m];
            }
            return result;
        }
    }
}