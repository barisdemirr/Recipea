using backend.Services;
using backend.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")] // URL: api/recipes
    [ApiController] // Bu class'ın bir API olduğunu belirtir
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        // Servisi enjekte ediyoruz
        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet] // GET isteği gelirse burası çalışır
        public async Task<IActionResult> GetAll()
        {
            var result = await _recipeService.GetAllRecipesAsync();
            return Ok(result); // 200 OK durum kodu ve veriyi döner.
        }
    }
}
