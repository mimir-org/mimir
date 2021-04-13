using AutoMapper;
using Mb.Core.Models;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mb.Core.Extensions
{
    public static class ModelBuilderModuleExtensions
    {
        public static IServiceCollection AddModelBuilderModule(this IServiceCollection services, string connectionString)
        {
            // Entity framework
            services.AddDbContext<ModelBuilderDbContext>(options =>
                options.UseSqlServer(connectionString, sqlOptions =>
                    sqlOptions.MigrationsAssembly("ModelBuilder.Core")));

            // Auto-mapper
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AttributeProfile>();
                cfg.AddProfile<ConnectorProfile>();
                cfg.AddProfile<EdgeProfile>();
                cfg.AddProfile<NodeProfile>();
                cfg.AddProfile<ProjectProfile>();
            });

            // Dependency injection
            services.AddSingleton(s => configuration.CreateMapper());
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IProjectService, ProjectService>();

            return services;
        }

        public static IApplicationBuilder AddModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            context.Database.Migrate();
            return app;
        }
    }
}
