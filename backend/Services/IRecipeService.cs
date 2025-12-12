using backend.Models;

namespace backend.Services
{
    public interface IRecipeService
    {
        List<Recipe> GetAll();
    }
}
