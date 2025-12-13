using backend.Data;
using backend.Services;
using backend.Services.Abstract;
using backend.Services.Concrete;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// -----------SERVICES-------------
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<IRecipeService, RecipeService>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    // appsettings.json'dan baðlantý cümlesini okuyoruz
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IRecipeService, RecipeService>(); // dbcontext altýnda olmalý


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


var app = builder.Build();



//-------MIDDLEWARE'LER-------
app.UseHttpsRedirection();
app.MapOpenApi();
app.UseCors("AllowLocalHost");
app.MapControllers();



app.Run();
