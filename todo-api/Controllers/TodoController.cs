using Microsoft.AspNetCore.Mvc;
using todo_api.Models;

namespace todo_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    public static List<Todo> Todos { get; set; } = new List<Todo>();
    
    public TodoController()
    {
       
    }
    
    public static void SeedData()
    {
        if (!Todos.Any())
        {
            Todos.Add(new Todo { Title = "Learn C#", CreatedAt = DateTime.UtcNow });
            Todos.Add(new Todo { Title = "Learn ASP.NET Core" });
            Todos.Add(new Todo { Title = "Build a Web API" }); 
        }
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Todos);
    }
    
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }
    
    [HttpPost()]
    public IActionResult Post([FromBody] Todo todo)
    {
        Todos.Add(todo);
        return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
    }
    
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] Todo todo)
    {
        var existingTodo = Todos.FirstOrDefault(t => t.Id == id);
        if (existingTodo == null)
        {
            return NotFound();
        }
        existingTodo.Title = todo.Title;
        existingTodo.IsComplete = todo.IsComplete;
        existingTodo.CompletedAt = todo.IsComplete ? DateTime.UtcNow : null;
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        Todos.Remove(todo);
        return NoContent();
    }
    
    [HttpPut("{id}/markdone")]
    public IActionResult MarkDone(Guid id)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        todo.IsComplete = true;
        todo.CompletedAt = DateTime.UtcNow;
        return NoContent();
    }
    
    [HttpPut("{id}/markundone")]
    public IActionResult MarkUndone(Guid id)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }
        todo.IsComplete = false;
        todo.CompletedAt = null;
        return NoContent();
    }
    
    [HttpDelete("cleardone")]
    public IActionResult ClearDone()
    {
        Todos.RemoveAll(t => t.IsComplete);
        return NoContent();
    }
}