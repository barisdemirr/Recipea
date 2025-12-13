using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor (Yapıcı Metot): Ayarları dışarıdan (Program.cs) almamızı sağlar.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Tablo Tanımı: Recipe sınıfım, veritabanında 'Recipes' tablosudur.
        public DbSet<Recipe> Recipes { get; set; }
    }
}
