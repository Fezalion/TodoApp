using Microsoft.AspNetCore.Mvc;
using todo_api.Models;

namespace todo_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private static List<Todo> Todos { get; } = new();

    public static void SeedData()
    {
        if (!Todos.Any())
        {
            Todos.Add(new Todo { Title = "Learn C#", Description = "Learn C# from scratch", IsComplete = true, CompletedAt = DateTime.UtcNow });
            Todos.Add(new Todo { Title = "Learn ASP.NET Core", Description = "Learn ASP.NET Core from scratch" });
            Todos.Add(new Todo { Title = "Build a Web API", Description = "Build a Web API using ASP.NET Core" }); 
        }
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(Todos);
    }
    
    [HttpGet("{guid:guid}")]
    public IActionResult Get(Guid guid)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == guid);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }
    
    [HttpPost]
    public IActionResult Post([FromBody] Todo todo)
    {
        Todos.Add(todo);
        return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
    }
    
    [HttpPut]
    [Route("{guid:guid}")]
    public IActionResult Put([FromRoute] Guid guid, [FromBody] Todo todo)
    {
        var existingTodo = Todos.FirstOrDefault(t => t.Id == guid);
        if (existingTodo == null)
        {
            return NotFound();
        }
        existingTodo.Title = todo.Title;
        existingTodo.Description = todo.Description;
        existingTodo.IsComplete = todo.IsComplete;
        existingTodo.CompletedAt = todo.IsComplete ? DateTime.UtcNow : null;
        return Ok(Todos);
    }
    
    [HttpDelete]
    [Route("{guid:guid}")]
    public IActionResult Delete(Guid guid)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == guid);
        if (todo == null)
        {
            return NotFound();
        }
        Todos.Remove(todo);
        return NoContent();
    }
    
    [HttpPut]
    [Route("{guid:guid}/markdone")]
    public IActionResult MarkDone(Guid guid)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == guid);
        if (todo == null)
        {
            return NotFound();
        }
        todo.IsComplete = true;
        todo.CompletedAt = DateTime.UtcNow;
        return Ok(todo);
    }
    
    [HttpPut]
    [Route("{guid:guid}/markundone")]
    public IActionResult MarkUndone(Guid guid)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == guid);
        if (todo == null)
        {
            return NotFound();
        }
        todo.IsComplete = false;
        todo.CompletedAt = null;
        return Ok(todo);
    }
    
    [HttpDelete]
    [Route("cleardone")]
    public IActionResult ClearDone()
    {
        Todos.RemoveAll(t => t.IsComplete);
        return Ok(Todos);
    }
}