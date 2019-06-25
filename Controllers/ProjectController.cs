using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using lite191svgjs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lite191svgjs.Controllers
{
   // [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly DataContext _context;

        public ProjectController(DataContext context)
        {
            _context = context;
        }

        // GET: api/values
       
        //[Authorize]

       // [HttpGet("[action]")]
       [Route("api/Project/Get")]
        public IEnumerable<Project> Get()
        {
           // DbInitializer.Initialize(_context);
            return _context.Projects;
        }



        

        // POST: api/StudentMastersAPI
        /*
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Project project)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            _context.Projects.Add(project);  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateException)  
            {  
                if (ProjectExists(project.ID))  
                {  
                    return new StatusCodeResult(StatusCodes.Status409Conflict);  
                }  
                else  
                {  
                    throw;  
                }  
            }  
            return CreatedAtAction("Get", new { id = project.ID }, project);  
        }
         
        */

        //PUT: api/ProjectController/5
         [Route("api/Project/Put/{id:int}")]
        //[HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Project project)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            if (id != project.ID)  
            {  
                return BadRequest();  
            }  
  
            _context.Entry(project).State = EntityState.Modified;  
  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateConcurrencyException)  
            {  
                if (!ProjectExists(id))  
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


        private bool ProjectExists(int id)  
        {  
            return _context.Projects.Any(e => e.ID == id);  
        }

        /* 
        public async Task<User> GetUserAsync(int userId)
        {
            // Code omitted:
            //
            // Given a user Id {userId}, retrieves a User object corresponding
            // to the entry in the database with {userId} as its Id.
        }
        */

        // DELETE: api/ExternalGridController/5  
       // [HttpDelete("{id}")]
        [Route("api/Project/Delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)  
        {  
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  
  
            Project project = await _context.Projects.SingleOrDefaultAsync(m => m.ID == id);
            /*var getUserTasks = _context.ExternalGrids.Select(id => GetUserAsync(id));
            return await Task.WhenAll(getUserTasks); */


            // usun wszystkie elementy zwiazane z tym projektem
            ExternalGrid[] extgrids = await _context.ExternalGrids.Where(m => m.ProjectId == id).ToArrayAsync();  
            OverheadLine[] ovheads = await _context.OverheadLines.Where(m => m.ProjectId == id).ToArrayAsync();  
            TwoPhaseTransformer[] twophasetrafo = await _context.TwoPhaseTransformers.Where(m => m.ProjectId == id).ToArrayAsync();  
            Bus[] buses = await _context.Buses.Where(m => m.ProjectId == id).ToArrayAsync();  
            if (project == null)  
            {  
                return NotFound();  
            }
  
            _context.Projects.Remove(project);
            //usun wszystkie elementy zwiazane z tym projektem 
            _context.ExternalGrids.RemoveRange(extgrids);
            _context.OverheadLines.RemoveRange(ovheads);  
            _context.TwoPhaseTransformers.RemoveRange(twophasetrafo);  
            _context.Buses.RemoveRange(buses);  

            await _context.SaveChangesAsync();
              
            return Ok(project);  
        }



      
        [Route("api/Project/CreateProject")]
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Project project)  
        {  
            
            if (!ModelState.IsValid)  
            {  
                return BadRequest(ModelState);  
            }  

            _context.Projects.Add(project);  
            try  
            {  
                await _context.SaveChangesAsync();  
            }  
            catch (DbUpdateException)  
            {  
                if (ProjectExists(project.ID))  
                {  
                    return new StatusCodeResult(StatusCodes.Status409Conflict);  
                }  
                else  
                {  
                    throw;  
                }  
            }  
            return CreatedAtAction("Get", new { id = project.ID }, project); 
            
        }

       

    }
}