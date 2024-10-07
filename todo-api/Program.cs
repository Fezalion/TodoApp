using todo_api.Controllers;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        b => b
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5096);
});

var app = builder.Build();

TodoController.SeedData();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(MyAllowSpecificOrigins);

// Log all available routes
var routeEndpoints = app as IEndpointRouteBuilder;
if (routeEndpoints != null)
{
    var endpoints = routeEndpoints.DataSources
        .SelectMany(ds => ds.Endpoints)
        .OfType<RouteEndpoint>();

    Console.WriteLine("Available routes:");
    foreach (var endpoint in endpoints)
    {
        var httpMethods = endpoint.Metadata
            .OfType<HttpMethodMetadata>()
            .FirstOrDefault()?.HttpMethods;

        var methods = httpMethods != null ? string.Join(", ", httpMethods) : "N/A";
        Console.WriteLine($"{methods}: {endpoint.RoutePattern.RawText}");
    }
}

app.Run();
