using System.ComponentModel.DataAnnotations;

namespace lite191svgjs.Models
{
    public class Load
    {
        public int ID { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "No. of node")]
        public int NodeNo { get; set; }

        [Required]
        [Display(Name = "Active power [MW]")]
        public int ActivePower { get; set; }

        [Required]
        [Display(Name = " Reactive power [MVAr]")]
        public double ReactivePower { get; set; }

        [Required]
        [Display(Name = "Rated voltage [kV]")]
        public double VoltageRated { get; set; }

        public int? ProjectId {get;set;} 

        public string svgXML {get;set;}


    }
}
