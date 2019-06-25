using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace lite191svgjs.Models
{
    public class ExternalGrid
    {
        
        public int ID { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Type")]
        //[CannotBeRed(ErrorMessage = "PQ is not allowed!")]
        public string NodeType { get; set; }

        [Required]
        [Display(Name = "No. of node")]
        public int NodeNo { get; set; }

       


        [Display(Name = "Voltage angle [deg]")]
        public double? VoltageAngle { get; set; }


        [Display(Name = "Voltage setpoint [p.u.]")]
        public double? VoltageSetpoint { get; set; }



        [Display(Name = "Active power [MW]")]
        public double? ActivePower { get; set; }


        [Display(Name = "Reactive power [MVAr]")]
        public double? ReactivePower { get; set; }
        
        //public Project Project {get;set;}        

        public int? ProjectId {get;set;} 

        public string svgXML {get;set;}

       // public string ProjectName {get;set;}   
    }
}
