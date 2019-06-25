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
    public class LineGlobalController : Controller
    {
        private readonly DataContext _context;

        public LineGlobalController(DataContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet("[action]")]
        public IEnumerable<LineGlobal> Get()
        {
            return _context.LinesGlobal;
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetBasedOnProject([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.LinesGlobal.Where(e => e.ProjectId == id);            
            return new ObjectResult(item);     
           
        }

        [HttpGet("[action]/{id}")]            
        public IActionResult GetBasedOnIdWithoutColumns([FromRoute] int id) // [FromRoute] int projectid [FromRoute] 
        {             
            var item = _context.LinesGlobal.Where(e => e.ID == id).Select(e => new { e.Name, e.StartNodeNo, e.EndNodeNo, e.Length, e.UnitaryResistance, e.UnitaryReactance, e.UnitaryCapacitance });
                           
            return new ObjectResult(item); 
        }

       
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LineGlobal lineGlobal)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            _context.LinesGlobal.Add(lineGlobal);  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateException)  
            {  
                if (LineGlobalExists(lineGlobal.ID))  
                {  
                    return new StatusCodeResult(StatusCodes.Status409Conflict);  
                }  
                else  
                {  
                    throw;  
                }  
            }  
            return CreatedAtAction("Get", new { id = lineGlobal.ID }, lineGlobal);  
        }

        private bool LineGlobalExists(int id)  
        {  
            return _context.LinesGlobal.Any(e => e.ID == id);  
        }

        // PUT: api/OverheadLineController/5  
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] LineGlobal lineGlobal)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            if (id != lineGlobal.ID)  
            {  
                return BadRequest();  
            }  
  
            _context.Entry(lineGlobal).State = EntityState.Modified;  
  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateConcurrencyException)  
            {  
                if (!LineGlobalExists(id))  
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
  
            LineGlobal lineGlobal = await _context.LinesGlobal.SingleOrDefaultAsync(m => m.ID == id);  
            if (lineGlobal == null)  
            { 
                return NotFound();  
            }  
  
            _context.LinesGlobal.Remove(lineGlobal);  
            await _context.SaveChangesAsync();
              
            return Ok(lineGlobal);  
        }         






    }

}