using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using lite191svgjs.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using System.ComponentModel.DataAnnotations;


namespace lite191svgjs.Controllers
{
   // [Route("[controller]")] 
    public class HomeController : Controller
    {
        // we need hosting environment for base path
        public IHostingEnvironment HostingEnv { get; }        
        private readonly DataContext _context;

        public HomeController(IHostingEnvironment env, DataContext context)
        {
            HostingEnv = env;
             _context = context;
        }
        [HttpGet]
        public IActionResult RedirectIndex()
        {
            return new PhysicalFileResult(
                Path.Combine(HostingEnv.WebRootPath,"index.html"),
                new MediaTypeHeaderValue("text/html")
            );
        }


    
    }
}
