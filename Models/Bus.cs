using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace lite191svgjs.Models
{
    public class Bus
    {
        
        public int ID { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Node Number")]        
        public int NodeNo { get; set; }      

        [Required]
        [Display(Name = "Nominal Voltage Line-Line [kv]")]        
        public int NominalVoltage { get; set; } 
  

        public int? ProjectId {get;set;} 

       // public string ProjectName {get;set;}   
    }
}
