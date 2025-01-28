using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected DataContext()
        {
        }

        // Represents our table name in our database
        public DbSet<Activity> Activities { get; set; }
    }
}