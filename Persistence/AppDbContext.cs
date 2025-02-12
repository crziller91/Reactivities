using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    // Represents our table name in our database
    public required DbSet<Activity> Activities { get; set; }
}
