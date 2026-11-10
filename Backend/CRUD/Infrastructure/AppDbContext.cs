using CRUD.Domain;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Infrastructure;

// Infrastructure layer: the bridge between C# code and SQL Server.
// Code talks to this class; this class talks to the database.
// One DbSet = one table.
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<TodoItem> Todos { get; set; }
}
