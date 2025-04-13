using App.Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace App.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<StudentEntity> Students { get; set; }

    }

}

