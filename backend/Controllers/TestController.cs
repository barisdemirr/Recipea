using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestController: ControllerBase
    {
        [HttpGet]
        public IActionResult RecipeOfTheDay() { 
            return Ok(new {
                id= 1,
                img= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7fYnaesu-jgC_ELcpKlV8FfepMAFkf1-9iw&s",
                title= "Karnýyarýk",
                ingredients=new[] { "patlýcan", "kýyma", "yað", "patlýcan", "kýyma", "yað" },
                recipe= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet feugiat quam eu congue. Donec consectetur dapibus libero, et consectetur erat cursus efficitur. Ut vestibulum molestie facilisis. Nunc semper ligula quis mi tristique ultrices. Donec sit amet tellus et augue ornare aliquam id a risus. Nunc id metus semper, hendrerit nulla ultricies, semper ex. Quisque et ultricies orci. Curabitur non lacus non metus tempor placerat. Aliquam ut mattis dui. Curabitur blandit dolor odio, ac vestibulum nisl cursus vel. Mauris a tellus posuere, congue metus eu, imperdiet lorem. Nulla cursus eget risus vitae tincidunt. Nulla a pellentesque mi, non semper sapien."
            });
        }
    }
}




