using backend.DTOs.Recipe;
using backend.Services;
using backend.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")] 
    [ApiController] 
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet] 
        public async Task<IActionResult> GetAll()
        {
            var result = await _recipeService.GetAllRecipesAsync();
            return Ok(result); 
        }


        [HttpGet("{recipeId}")] 
        public async Task<IActionResult> GetFilteredRecipe(int recipeId)
        {
            var result = await _recipeService.GetFilteredRecipeAsync(recipeId);
            return Ok(result); 
        }


        [HttpGet("recipeoftheday")] 
        public async Task<IActionResult> GetRecipeOfTheDay()
        {
            var result = await _recipeService.GetRecipeOfTheDayAsync();
            return Ok(result); 
        }


        [Authorize]
        [HttpPost("addrecipe")]
        public async Task<IActionResult> AddRecipe([FromForm] RecipeCreateDto recipeDto)
        {

            var newId = await _recipeService.CreateRecipeAsync(recipeDto);

            return Ok(new {message = "success", id = newId}); 
        }

        [Authorize]
        [HttpGet("recipecount")]
        public async Task<IActionResult> GetRecipeCount()
        {
            var res = await _recipeService.CountRecipeAsync();
            return Ok(res);
        }
    }
}   
