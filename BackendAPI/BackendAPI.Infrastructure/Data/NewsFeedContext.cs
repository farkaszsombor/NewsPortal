using BackendAPI.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace BackendAPI.Infrastructure
{
    public class NewsFeedContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Article> Articles { get; set; }
        public NewsFeedContext(DbContextOptions<NewsFeedContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
