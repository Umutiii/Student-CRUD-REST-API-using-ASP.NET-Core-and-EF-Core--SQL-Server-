using App.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors   
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Veritaban� ba�lant�s�
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("Default");
    options.UseSqlServer(connectionString);
});

var app = builder.Build();

// Veritaban�n� olu�tur (sadece varsa dokunma, yoksa olu�tur)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Veritaban� varsa b�rak, yoksa olu�tur
    await dbContext.Database.EnsureCreatedAsync();

    // E�er ��renciler zaten varsa veri ekleme, yoksa 20 sahte veri ekle
    if (!dbContext.Students.Any())
    {
        BogusFakeData.SeedStudents(dbContext);
    }
}

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
