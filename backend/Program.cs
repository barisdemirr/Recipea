using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// -----------SERVICES-------------
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<IRecipeService, JsonRecipeService>();
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
