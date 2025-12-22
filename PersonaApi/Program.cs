using FluentValidation;
using FluentValidation.AspNetCore;
using PersonaApi.Models;
using PersonaApi.Services;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURACIÓN DE SERVICIOS (Dependency Injection) ---

// Registrar el servicio de Personas como Singleton 
// (Para que los datos no se borren mientras la app esté corriendo)
builder.Services.AddSingleton<PersonaService>();

// Configurar Controladores
builder.Services.AddControllers();

// Configurar FluentValidation (Versión moderna sin avisos de obsoleto)
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<PersonaValidator>();

// Configurar CORS: Permitir que React (usualmente en puerto 3000 o 5173) acceda a la API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()   // En producción se cambia por la URL de React
              .AllowAnyMethod()   // Permitir GET, POST, PUT, DELETE
              .AllowAnyHeader();  // Permitir cualquier encabezado
    });
});

// Configurar Swagger (Documentación de la API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 2. CONFIGURACIÓN DEL PIPELINE (Middleware) ---

// Habilitar Swagger siempre en modo desarrollo para probar fácil
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ¡IMPORTANTE!: Usar la política de CORS antes de MapControllers
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();