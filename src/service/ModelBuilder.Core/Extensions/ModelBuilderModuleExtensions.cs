using AutoMapper;
using Mb.Core.Models;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Mb.Core.Extensions
{
    public static class ModelBuilderModuleExtensions
    {
        public static IServiceCollection AddModelBuilderModule(this IServiceCollection services)
        {
            // Auto-mapper
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AttributeProfile>();
                cfg.AddProfile<ConnectorProfile>();
                cfg.AddProfile<EdgeProfile>();
                cfg.AddProfile<NodeProfile>();
                cfg.AddProfile<ProjectProfile>();
                cfg.AddProfile<RdsProfile>();
            });

            // Dependency injection
            services.AddSingleton(s => configuration.CreateMapper());
            services.AddSingleton<IFileRepository, JsonFileRepository>();

            services.AddScoped<ITypeEditorService, TypeEditorService>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<INodeRepository, NodeRepository>();
            services.AddScoped<IEdgeRepository, EdgeRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();
            services.AddScoped<IProjectService, ProjectService>();

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            return services;
        }

        public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            context.Database.Migrate();
            return app;
        }
    }
}
