using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace lite191svgjs.Models
{
    public class Project
    {
        
        public int ID { get; set; }

        [Required]
        [StringLength(255)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        public DateTime LastUpdate {get;set;}

        public string UserId { get;set; }
        /*      

        public ICollection<ExternalGrid> ExternalGrids {get;set;}

        public Project()
        {
            ExternalGrids = new Collection<ExternalGrid>();            
        }
        */
        
    }
}