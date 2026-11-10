using CRUD.Application;
using CRUD.Domain;
using CRUD.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Controllers;

// API layer: receives HTTP requests from the Next.js frontend,
// talks to the database through AppDbContext, returns JSON.
[ApiController]
[Route("api/todos")]
public class TodosController : ControllerBase
{
    private readonly AppDbContext _db;

    public TodosController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/todos — list all todos, newest first
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetTodos()
    {
        return await _db.Todos
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    // POST /api/todos — create one todo
    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodo(CreateTodoRequest request)
    {
        var todo = new TodoItem
        {
            Name = request.Name,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow
        };

        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
    }

    // PUT /api/todos/5 — replace name + description of one todo
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(int id, UpdateTodoRequest request)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        todo.Name = request.Name;
        todo.Description = request.Description;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    // DELETE /api/todos/5 — remove one todo
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo is null) return NotFound();

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
