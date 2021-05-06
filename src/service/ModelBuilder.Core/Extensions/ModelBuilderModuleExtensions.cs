using System.Threading;
using AutoMapper;
using Mb.Core.Configurations;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;

namespace Mb.Core.Extensions
{
    public static class ModelBuilderModuleExtensions
    {
        public static IServiceCollection AddModelBuilderModule(this IServiceCollection services, IConfiguration configuration)
        {
            // Auto-mapper
            var autoMapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AttributeProfile>();
                cfg.AddProfile<ConnectorProfile>();
                cfg.AddProfile<EdgeProfile>();
                cfg.AddProfile<NodeProfile>();
                cfg.AddProfile<ProjectProfile>();
            });

            // ModelBuilder Configuration configurations
            var modelBuilderSection = configuration.GetSection(nameof(ModelBuilderConfiguration));
            var modelBuilderConfiguration = new ModelBuilderConfiguration();
            modelBuilderSection.Bind(modelBuilderConfiguration);
            services.Configure<ModelBuilderConfiguration>(modelBuilderSection.Bind);

            // Dependency injection
            services.AddSingleton(s => autoMapperConfiguration.CreateMapper());
            services.AddSingleton<IFileRepository, JsonFileRepository>();
            services.AddSingleton<IGenerateIdRepository, GenerateIdRepository>();

            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<INodeRepository, NodeRepository>();
            services.AddScoped<IEdgeRepository, EdgeRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();
            services.AddScoped<IRdsRepository, RdsRepository>();
            services.AddScoped<IAttributeTypeRepository, AttributeTypeRepository>();
            services.AddScoped<ILibraryTypeComponentRepository, LibraryTypeComponentRepository>();

            services.AddScoped<ITypeEditorService, TypeEditorService>();
            services.AddScoped<IProjectService, ProjectService>();

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            return services;
        }

        public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            var typeEditorService = serviceScope.ServiceProvider.GetRequiredService<ITypeEditorService>();
            var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<TypeEditorService>>();

            context.Database.Migrate();

            
            var awaiter = typeEditorService.LoadDataFromFiles().ConfigureAwait(true).GetAwaiter();
            while (!awaiter.IsCompleted)
            {
                logger.LogInformation("Starting initialize db");
                Thread.Sleep(2000);
            }
            return app;
        }
    }
}
