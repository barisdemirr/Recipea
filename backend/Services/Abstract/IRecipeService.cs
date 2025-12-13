using backend.DTOs.Recipe;


namespace backend.Services.Abstract
{
    public interface IRecipeService
    {
        Task<List<RecipeListDto>> GetAllRecipesAsync();

        Task<int> CreateRecipeAsync(RecipeCreateDto dto);

    }
}
