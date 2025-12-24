using backend.Data;
using backend.Services;
using backend.Services.Abstract;
using backend.Services.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];

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
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience=true,
        ValidateLifetime= true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});



var app = builder.Build();



//-------MIDDLEWARE'LER-------
app.UseMiddleware<backend.Middlewares.ExceptionMiddleware>();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("AllowLocalHost");

app.UseAuthentication();
app.UseAuthorization();

app.MapOpenApi();
app.MapControllers();



app.Run();
