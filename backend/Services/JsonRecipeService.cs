using System.Text.Json;
using backend.Models;
namespace backend.Services
{
    public class JsonRecipeService : IRecipeService
    {
        public List<Recipe> GetAll()
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "mocks", "recipes.json");

            if (!File.Exists(filepath))
            {
                return new List<Recipe>();
            }

            var jsonfile = File.ReadAllText(filepath);

            return JsonSerializer.Deserialize<List<Recipe>>(jsonfile, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = false
            }) ?? new List<Recipe>();
        }
    }
}
