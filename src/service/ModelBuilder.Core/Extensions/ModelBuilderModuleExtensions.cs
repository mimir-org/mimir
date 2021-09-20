using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using AutoMapper;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services;
using Mb.Core.Services.Contracts;
using Mb.Models.Attributes;
using Mb.Models.Configurations;
using Mb.Models.Enums;
using Mb.Models.Modules;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public static IEnumerable<Type> GetTypes<T>(Assembly assembly)
        {
            var info = typeof(T).GetTypeInfo();
            return
                info.Assembly.GetTypes()
                    .Concat(assembly.GetTypes())
                    .Where(x => info.IsAssignableFrom(x))
                    .Where(x => x.IsClass && !x.IsAbstract && x.IsPublic);
        }

        public static IServiceCollection AddModelBuilderModule(this IServiceCollection services, IConfiguration configuration)
        {
            // ModelBuilder Configuration configurations
            var modelBuilderSection = configuration.GetSection(nameof(ModelBuilderConfiguration));
            var modelBuilderConfiguration = new ModelBuilderConfiguration();
            modelBuilderSection.Bind(modelBuilderConfiguration);
            services.Configure<ModelBuilderConfiguration>(modelBuilderSection.Bind);
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Dependency injection
            services.AddSingleton<IFileRepository, JsonFileRepository>();
            services.AddSingleton<ICommonRepository, CommonRepository>();
            
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
            services.AddScoped<INodeTypeTerminalTypeRepository, NodeTypeTerminalTypeRepository>();
            services.AddScoped<IPredefinedAttributeRepository, PredefinedAttributeRepository>();
            services.AddScoped<IBlobDataRepository, BlobDataRepository>();
            services.AddScoped<ITransportTypeRepository, TransportTypeRepository>();
            services.AddScoped<IInterfaceTypeRepository, InterfaceTypeRepository>();
            services.AddScoped<ITransportRepository, TransportRepository>();
            services.AddScoped<IInterfaceRepository, InterfaceRepository>();
            services.AddScoped<INodeTypeRepository, NodeTypeRepository>();
            services.AddScoped<ICompositeTypeRepository, CompositeTypeRepository>();
            services.AddScoped<ICompositeRepository, CompositeRepository>();

            services.AddScoped<ITypeEditorService, TypeEditorService>();
            services.AddScoped<ISeedingService, SeedingService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ILibraryService, LibraryService>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<IEnumService, EnumService>();
            services.AddScoped<INodeService, NodeService>();

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            // Automatic dependency injection for all modules
            var moduleService = new ModuleService();
            services.AddServicesWithAttributeOfType<SingletonAttribute>(moduleService?.Assemblies ?? new List<Assembly>());
            services.AddServicesWithAttributeOfType<ScopeAttribute>(moduleService?.Assemblies ?? new List<Assembly>());
            services.AddServicesWithAttributeOfType<TransientAttribute>(moduleService?.Assemblies ?? new List<Assembly>());

            var provider = services.BuildServiceProvider();

            var plugins = moduleService.Modules.Where(x => x.ModuleType == ModuleType.Plugin || x.ModuleType == ModuleType.SyncService).ToList();
            foreach (var plugin in plugins)
            {
                if (plugin.Instance is IModelBuilderPlugin p)
                {
                    p.CreateModule(services, configuration, provider);
                }

                if (plugin.Instance is IModelBuilderSyncService s)
                {
                    s.CreateModule(services, configuration, provider);
                }
            }

            services.AddSingleton<IModuleService>(x => moduleService);

            // Auto-mapper
            var autoMapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AttributeProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new ConnectorProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new EdgeProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new NodeProfile(provider.GetService<IHttpContextAccessor>(), provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new ProjectProfile(provider.GetService<IHttpContextAccessor>(), provider.GetService<ICommonRepository>()));
                cfg.AddProfile<RdsProfile>();
                cfg.AddProfile<CommonProfile>();
                cfg.AddProfile(new TerminalProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new LibraryTypeProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new TransportProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new InterfaceProfile(provider.GetService<ICommonRepository>()));
                cfg.AddProfile(new CompositeProfile(provider.GetService<ICommonRepository>()));
            });
            services.AddSingleton(s => autoMapperConfiguration.CreateMapper());

            return services;

        }

        public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            var seedingService = serviceScope.ServiceProvider.GetRequiredService<ISeedingService>();
            var moduleService = serviceScope.ServiceProvider.GetRequiredService<IModuleService>();
            var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<TypeEditorService>>();

            context.Database.Migrate();

            
            var awaiter = seedingService.LoadDataFromFiles().ConfigureAwait(true).GetAwaiter();
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
