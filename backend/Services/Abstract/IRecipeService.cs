using backend.DTOs.Recipe;


namespace backend.Services.Abstract
{
    public interface IRecipeService
    {
        Task<List<RecipeListDto>> GetAllRecipesAsync();

        Task<FilteredRecipeDto> GetFilteredRecipeAsync(int recipeId);

        Task<int> CreateRecipeAsync(RecipeCreateDto dto);

    }
}
