namespace CRUD.Domain;

// Domain layer: the data container class.
// One TodoItem object = one row in the Todos table.
// EF Core reads this class and creates the table from it (code-first).
public class TodoItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
