using System.ComponentModel.DataAnnotations;

namespace todo_api.Models;

public class Todo
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; }
    public bool IsComplete { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
}