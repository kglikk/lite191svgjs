using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using lite191svgjs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace lite191svgjs.Controllers
{
 
     [Route("api/[controller]")] 
    public class BusController : Controller
    {        
        private readonly DataContext _context;

        public BusController(DataContext context)
        {
            _context = context;
        } 

        // GET: api/values
        [HttpGet("[action]")]
        //[Authorize] 
               
        public IEnumerable<Bus> Get()
        {
            return _context.Buses;
        } 


        // GET: api/values
        // [HttpGet("{id}")]
        //[HttpGet("[action]")]
        //[Authorize]  
        [HttpGet("[action]/{id}")]            
        public IActionResult GetBasedOnProject([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.Buses.Where(e => e.ProjectId == id);
                   
            return new ObjectResult(item); 
        }

        [HttpGet("[action]/{id}")]            
        public IActionResult GetBasedOnProjectWithoutColumns([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.Buses.Where(e => e.ProjectId == id).Select(e => new { e.Name, e.NodeNo, e.NominalVoltage });
                           
            return new ObjectResult(item); 
        }

        // POST: api/StudentMastersAPI  
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bus bus)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            _context.Buses.Add(bus);  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateException)  
            {  
                if (BusExists(bus.ID))  
                {  
                    return new StatusCodeResult(StatusCodes.Status409Conflict);  
                }  
                else  
                {  
                    throw;  
                }  
            }  
            return CreatedAtAction("Get", new { id = bus.ID }, bus);  
        }

        private bool BusExists(int id)  
        {  
            return _context.Buses.Any(e => e.ID == id);  
        }

        // PUT: api/ExternalGridController/5  
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Bus bus)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            if (id != bus.ID)  
            {  
                return BadRequest();  
            }  
  
            _context.Entry(bus).State = EntityState.Modified;  
  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateConcurrencyException)  
            {  
                if (!BusExists(id))  
                {  
                    return NotFound();  
                }  
                else  
                {  
                    throw;  
                }  
            }  
  
            return NoContent();  
        }

        // DELETE: api/ExternalGridController/5  
        [HttpDelete("{id}")]  
        public async Task<IActionResult> Delete([FromRoute] int id)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            Bus bus = await _context.Buses.SingleOrDefaultAsync(m => m.ID == id);  
            if (bus == null)  
            {  
                return NotFound();  
            }  
  
            _context.Buses.Remove(bus);  
            await _context.SaveChangesAsync();
              
            return Ok(bus);  
        } 


        
    }
}