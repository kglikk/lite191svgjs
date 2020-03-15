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

namespace lite191svgjs.Controllers
{
    [Route("api/[controller]")]
    public class LoadController : Controller
    {
        private readonly DataContext _context;

        public LoadController(DataContext context)
        {
            _context = context;
        }

        // GET: api/values
       [HttpGet("[action]")]
        public IEnumerable<Load> Get()
        {
            return _context.Loads;
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetBasedOnProject([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.Loads.Where(e => e.ProjectId == id);            
            return new ObjectResult(item);     
           
        }

        [HttpGet("[action]/{id}")]
         public IActionResult GetBasedOnProjectWithoutColumns([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.Loads.Where(e => e.ProjectId == id).Select(e => new { e.Name, e.NodeNo, e.ActivePower, e.ReactivePower, e.VoltageRated });            
            return new ObjectResult(item);     
           
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Load load)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            _context.Loads.Add(load);  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateException)  
            {  
                if (LoadExists(load.ID))  
                {  
                    return new StatusCodeResult(StatusCodes.Status409Conflict);  
                }  
                else  
                {  
                    throw;  
                }  
            }  
            return CreatedAtAction("Get", new { id = load.ID }, load);  
        }

        private bool LoadExists(int id)  
        {  
            return _context.Loads.Any(e => e.ID == id);  
        }

        // PUT: api/OverheadLineController/5  
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Load load)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            if (id != load.ID)  
            {  
                return BadRequest();  
            }  
  
            _context.Entry(load).State = EntityState.Modified;  
  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateConcurrencyException)  
            {  
                if (!LoadExists(id))  
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
  
            Load load = await _context.Loads.SingleOrDefaultAsync(m => m.ID == id);  
            if (load == null)  
            { 
                return NotFound();  
            }  
  
            _context.Loads.Remove(load);  
            await _context.SaveChangesAsync();
              
            return Ok(load);  
        }         
    }
}