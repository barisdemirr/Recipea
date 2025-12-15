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


        public async Task<FilteredRecipeDto> GetFilteredRecipeAsync(int recipeId)
        {
            var filteredRecipe = await _context.Recipes
                .Where(x => x.Id == recipeId).Select(x => new FilteredRecipeDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Img = x.Img,
                    Ingredients = x.Ingredients,
                    RecipeText = x.RecipeText
                })
                .FirstOrDefaultAsync(); 

            return filteredRecipe;
        }


        public async Task<RecipeOfTheDayDto> GetRecipeOfTheDayAsync()
        {
            int totalRecipes = await _context.Recipes.CountAsync();

            if (totalRecipes == 0) { return null; }

            int seed = DateTime.Now.Date.GetHashCode();

            Random dailyRandom = new Random(seed);
            int index = dailyRandom.Next(totalRecipes);

            var recipe = await _context.Recipes.Skip(index).Take(1).FirstOrDefaultAsync();

            return new RecipeOfTheDayDto
            {
                Id = recipe.Id,
                Title = recipe.Title,
                Img = recipe.Img,
                Ingredients = recipe.Ingredients,
                RecipeText = recipe.RecipeText
            };
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
