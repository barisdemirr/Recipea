using backend.Data;
using backend.DTOs.Recipe;
using backend.Models;
using backend.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Concrete
{
    public class RecipeService : IRecipeService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly AppDbContext _context; // Veritabanı bağlantısı

        // Constructor Injection: DbContext'i Program.cs'ten istiyoruz.
        public RecipeService(IWebHostEnvironment environment, AppDbContext context)
        {
            _environment = environment;
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
            // check

            if (dto.Img == null || dto.Img.Length == 0)
            {
                throw new Exception("File uploading obligation!");
            }


            if (dto.Img.Length > 2 * 1024 * 1024)
            {
                throw new Exception("Dosya boyutu 2 MB'dan büyük olamaz!");
            }
            Console.WriteLine(dto.Img.FileName);

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(dto.Img.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                throw new Exception("Sadece .jpg, .jpeg ve .png formatları kabul edilir!");
            }

            // process

            string uniqueFileName = $"{Guid.NewGuid()}_{dto.Img.FileName}";

            string uploadsPath = Path.Combine(_environment.WebRootPath, "uploads/recipes");

            if (!Directory.Exists(uploadsPath)) Directory.CreateDirectory(uploadsPath);

            string imgPath = Path.Combine(uploadsPath, uniqueFileName);


            // using ne işe yarar? stream gibi işlemler bitince ramde yer kaplamakla yetinmez üstüne işletim sisteminde dosya kilidi tutar
            // bu yüzden using kullanıyoruz ki işlem tamamlanınca oto. sonlansın

            using var fileStream = new FileStream(imgPath, FileMode.Create);
            
            await dto.Img.CopyToAsync(fileStream);
            

            var newRecipe = new Recipe
            {
                Title = dto.Title,
                Type = dto.Type,
                Img = uniqueFileName,
                Ingredients = dto.Ingredients,
                RecipeText = dto.RecipeText
            };

            await _context.Recipes.AddAsync(newRecipe);

            await _context.SaveChangesAsync();
            return newRecipe.Id;
        }
    }
}
