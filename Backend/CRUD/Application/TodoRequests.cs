using System.ComponentModel.DataAnnotations;

namespace CRUD.Application;

// Application layer: the shapes of data coming IN from the frontend.
// We do not take a full TodoItem from the client, because the client
// must not decide the Id or the CreatedAt — the server owns those.
public class CreateTodoRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
}

public class UpdateTodoRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
}
