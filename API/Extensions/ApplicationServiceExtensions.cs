using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // "this" is what we are using the method on so we don't have to pass anything into it
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            services.AddOpenApi();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    // This is our policy. We don't care about the header, we don't care about the method
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            // When our application starts up, we register, add mediator and then the mediator is going to register all of our handlers
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

            // When our application starts, auto mapper is going to be registered as a service. Its going to take a look inside this assembly
            // that contains mapping profiles and register all of our mapping profiles so that they can be used.
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // Return the services
            return services;
        }
    }
}