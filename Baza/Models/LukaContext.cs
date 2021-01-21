using Microsoft.EntityFrameworkCore;

namespace Baza.Models
{
    public class LukaContext : DbContext
    {
        public DbSet<Luka> Luke { get; set; }
        public DbSet<Brod> Brodovi { get; set; }
        public DbSet<Kontejner> Kontejneri { get; set; }

        public LukaContext(DbContextOptions options)
            : base(options)
        {

        }
    }
}