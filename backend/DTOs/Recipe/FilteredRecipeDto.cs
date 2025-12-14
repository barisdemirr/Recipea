namespace backend.DTOs.Recipe
{
    public class FilteredRecipeDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Img { get; set; }
        public List<string> Ingredients { get; set; }
        public string RecipeText { get; set; }
    }
}

