namespace backend.DTOs.Recipe
{
    public class RecipeCreateDto
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public IFormFile Img { get; set; }
        public List<string> Ingredients { get; set; }
        public string RecipeText { get; set; }
    }
}
