using System.Threading;
using AutoMapper;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services;
using Mb.Core.Services.Contracts;
using Mb.Models.Configurations;
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
            // ModelBuilder Configuration configurations
            var modelBuilderSection = configuration.GetSection(nameof(ModelBuilderConfiguration));
            var modelBuilderConfiguration = new ModelBuilderConfiguration();
            modelBuilderSection.Bind(modelBuilderConfiguration);
            services.Configure<ModelBuilderConfiguration>(modelBuilderSection.Bind);

            // Dependency injection
            services.AddSingleton<IFileRepository, JsonFileRepository>();
            services.AddSingleton<ICommonRepository, CommonRepository>();
            services.AddSingleton<IModuleService, ModuleService>();

            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<INodeRepository, NodeRepository>();
            services.AddScoped<IEdgeRepository, EdgeRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();
            services.AddScoped<IRdsRepository, RdsRepository>();
            services.AddScoped<IAttributeTypeRepository, AttributeTypeRepository>();
            services.AddScoped<ILibraryTypeRepository, LibraryTypeRepository>();
            services.AddScoped<IConnectorRepository, ConnectorRepository>();
            services.AddScoped<IAttributeRepository, AttributeRepository>();
            services.AddScoped<IContractorRepository, ContractorRepository>();
            services.AddScoped<ITerminalTypeRepository, TerminalTypeRepository>();
            services.AddScoped<IEnumBaseRepository, EnumBaseRepository>();
            services.AddScoped<INodeTypeTerminalType, NodeTypeTerminalType>();

            services.AddScoped<ITypeEditorService, TypeEditorService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ILibraryService, LibraryService>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<IEnumService, EnumService>();

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            var provider = services.BuildServiceProvider();

            // Auto-mapper
            var autoMapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AttributeProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile<ConnectorProfile>();
                cfg.AddProfile<EdgeProfile>();
                cfg.AddProfile(new NodeProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile<ProjectProfile>();
                cfg.AddProfile<RdsProfile>();
                cfg.AddProfile(new TerminalProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new LibraryTypeProfile(provider.GetService<ICommonRepository>()));
            });
            services.AddSingleton(s => autoMapperConfiguration.CreateMapper());

            return services;

        }

        public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            var typeEditorService = serviceScope.ServiceProvider.GetRequiredService<ITypeEditorService>();
            var moduleService = serviceScope.ServiceProvider.GetRequiredService<IModuleService>();
            var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<TypeEditorService>>();

            context.Database.Migrate();

            
            var awaiter = typeEditorService.LoadDataFromFiles().ConfigureAwait(true).GetAwaiter();
            while (!awaiter.IsCompleted)
            {
                logger.LogInformation("Starting initialize db");
                Thread.Sleep(2000);
            }

            var moduleReaderAwaiter = moduleService.InitialModules().ConfigureAwait(true).GetAwaiter();

            while (!moduleReaderAwaiter.IsCompleted)
            {
                logger.LogInformation("Reading modules");
                Thread.Sleep(2000);
            }

            return app;
        }
    }
}
