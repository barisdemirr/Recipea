using backend.Data;
using backend.DTOs.Recipe;
using backend.Models;
using backend.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Concrete
{
    public class RecipeService : IRecipeService
    {
        private readonly AppDbContext _context; // Veritabanı bağlantısı

        // Constructor Injection: DbContext'i Program.cs'ten istiyoruz.
        public RecipeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeListDto>> GetAllRecipesAsync()
        {
            // LINQ Sorgusu: SQL yazmadan C# ile sorgu atıyoruz.
            // Select işlemi: Entity -> DTO dönüşümü (Mapping)
            var recipes = await _context.Recipes
                .Select(x => new RecipeListDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Type = x.Type,
                    Img = x.Img,
                    Ingredients = x.Ingredients
                })
                .ToListAsync(); // Veritabanına "Select * from Recipes" sorgusu şimdi gider.

            return recipes;
        }


        public async Task<int> CreateRecipeAsync(RecipeCreateDto dto)
        {
            var newRecipe = new Recipe
            {
                Title = dto.Title,
                Type = dto.Type,
                Img = dto.Img,
                Ingredients = dto.Ingredients,
                RecipeText = dto.RecipeText
            };

            await _context.Recipes.AddAsync(newRecipe);

            await _context.SaveChangesAsync();
            return newRecipe.Id;
        }
    }
}
