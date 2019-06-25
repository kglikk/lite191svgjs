using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace lite191svgjs.Models
{
    public class LineGlobal
    {
        public int ID { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Line Type")]
        public string LineType { get; set; }

        [Required]
        [Display(Name = "No. of start node")]
        public int StartNodeNo { get; set; }

        [Required]
        [Display(Name = "No. of end node")]
        public int EndNodeNo { get; set; }

        [Required]
        [Display(Name = "Length [km]")]
        public double Length { get; set; }

        [Required]
        [Display(Name = "Unitary resistance [Ω/km]")]
        public double UnitaryResistance { get; set; }

        [Required]
        [Display(Name = "Unitary reactance [Ω/km]")]
        public double UnitaryReactance { get; set; }

        [Required]
        [Display(Name = "Unitary capacitance [μS/km]")]
        public double UnitaryCapacitance { get; set; }
       // public Project Project {get;set;} 
       
              

        public int? ProjectId {get;set;} 
    }
}
