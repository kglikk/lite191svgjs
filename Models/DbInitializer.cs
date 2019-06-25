using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lite191svgjs.Models
{
    public class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();

            Console.WriteLine("Jestem w DBinitializer");
            

            // Look for any students.
           // if (context.ExternalGrids.Any() || context.OverheadLines.Any() || context.TwoPhaseTransformers.Any())
            if(context.Projects.Any())
            {
                return;   // DB has been seeded
            }

            var projects = new Project[]
            {
                 new Project{Name="3 bus"},
                             
            };

            foreach (Project s in projects)
            {
                context.Projects.Add(s);
            }
            context.SaveChanges();

            var twophasetransformers = new TwoPhaseTransformer[]
            {
            };
            foreach (TwoPhaseTransformer s in twophasetransformers)
            {
                context.TwoPhaseTransformers.Add(s);
            }
            context.SaveChanges();

            
            var projekt3bus = context.Projects.Where(Project => Project.Name == "3 bus").First();


             var buses = new Bus[]
            {
                 new Bus{Name="Bus1", NodeNo=0, NominalVoltage = 60, ProjectId = projekt3bus.ID},
                 new Bus{Name="Bus2", NodeNo=1, NominalVoltage = 60, ProjectId = projekt3bus.ID},
                 new Bus{Name="Bus3", NodeNo=2, NominalVoltage = 60, ProjectId = projekt3bus.ID}
            };
            

            foreach (Bus s in buses)
            {
                context.Buses.Add(s);
            }
            context.SaveChanges();

            var externalgrids = new ExternalGrid[]
            {
                 new ExternalGrid{Name="ExtGrid1", NodeNo=0, NodeType="SL", VoltageAngle=0, VoltageSetpoint=1, ProjectId = projekt3bus.ID  },
                 new ExternalGrid{Name="ExtGrid2", NodeNo=1, NodeType="PV", VoltageAngle=0, VoltageSetpoint=1, ActivePower=60, ProjectId = projekt3bus.ID},
                 new ExternalGrid{Name="ExtGrid3", NodeNo=2, NodeType="PQ", VoltageAngle=0, ActivePower=-80, ReactivePower = -60, ProjectId = projekt3bus.ID}
            };
            

            foreach (ExternalGrid s in externalgrids)
            {
                context.ExternalGrids.Add(s);
            }
            context.SaveChanges();

            
             
            var overheadlines = new OverheadLine[]
            {
                 new OverheadLine{Name="Line1", StartNodeNo=0, EndNodeNo=1, Length=1, UnitaryResistance=0, UnitaryReactance =18, UnitaryCapacitance=0, ProjectId = projekt3bus.ID },
                 new OverheadLine{Name="Line2", StartNodeNo=0, EndNodeNo=2, Length=1, UnitaryResistance=0, UnitaryReactance =7.2, UnitaryCapacitance=0, ProjectId = projekt3bus.ID },
                 new OverheadLine{Name="Line3", StartNodeNo=1, EndNodeNo=2, Length=1, UnitaryResistance=0, UnitaryReactance =9, UnitaryCapacitance=277.8, ProjectId = projekt3bus.ID }
            };            

            foreach (OverheadLine s in overheadlines)
            {
                context.OverheadLines.Add(s);
            }
            context.SaveChanges();

            
            
            var linesGlobal = new LineGlobal[]
            {
                 new LineGlobal{Name="A2XS(FL)2Y 1x95 18/30 kV", StartNodeNo=0, EndNodeNo=0, Length=1, UnitaryResistance=12, UnitaryReactance =11, UnitaryCapacitance=23 },
                 new LineGlobal{Name="A2XS(FL)2Y 1x120 18/30 kV", StartNodeNo=0, EndNodeNo=0, Length=1, UnitaryResistance=14, UnitaryReactance =3, UnitaryCapacitance=26 },
                 new LineGlobal{Name="A2XS(FL)2Y 1x150 18/30 kV", StartNodeNo=0, EndNodeNo=0, Length=1, UnitaryResistance=15, UnitaryReactance =2, UnitaryCapacitance=58 }
            };            

            foreach (LineGlobal s in linesGlobal)
            {
                context.LinesGlobal.Add(s);
            }
            context.SaveChanges();

            return;
            
        }
    }
}
