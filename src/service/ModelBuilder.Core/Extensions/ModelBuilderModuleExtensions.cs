using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using AutoMapper;
using AutoMapper.Configuration;
using Mb.Core.Profiles;
using Mb.Core.Repositories;
using Mb.Core.Repositories.Contracts;
using Mb.Core.Services;
using Mb.Core.Services.Contracts;
using Mb.Models.Configurations;
using Mb.Modules;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

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
            
            
            
            services.AddScoped<IConnectorRepository, ConnectorRepository>();
            services.AddScoped<IAttributeRepository, AttributeRepository>();
            services.AddScoped<IContractorRepository, ContractorRepository>();
            
            
            services.AddScoped<IBlobDataRepository, BlobDataRepository>();
            
            
            services.AddScoped<ITransportRepository, TransportRepository>();
            services.AddScoped<IInterfaceRepository, InterfaceRepository>();
            
            
            services.AddScoped<ICompositeRepository, CompositeRepository>();

            services.AddScoped<ISeedingService, SeedingService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ILibraryService, LibraryService>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<INodeService, NodeService>();

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            var provider = services.BuildServiceProvider();

            // Automatic dependency injection for all modules
            var moduleService = new ModuleService();
            services.AddServicesWithAttributeOfType<SingletonAttribute>(moduleService.Assemblies ?? new List<Assembly>());
            services.AddServicesWithAttributeOfType<ScopeAttribute>(moduleService.Assemblies ?? new List<Assembly>());
            services.AddServicesWithAttributeOfType<TransientAttribute>(moduleService.Assemblies ?? new List<Assembly>());

            services.AddSingleton<IModuleService>(_ => moduleService);
            var modules = moduleService.Modules.Where(x => x.ModuleType == ModuleType.Plugin || x.ModuleType == ModuleType.SyncService || x.ModuleType == ModuleType.Parser).ToList();

            // Auto-mapper
            var cfg = new MapperConfigurationExpression();
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

            // Create profiles
            cfg.CreateProfiles(modules);

            var mapperConfig = new MapperConfiguration(cfg);
            services.AddSingleton(_ => mapperConfig.CreateMapper());

            // Add modules
            services.CreateModules(configuration, modules);
            
            return services;
        }

        public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            var seedingService = serviceScope.ServiceProvider.GetRequiredService<ISeedingService>();
            var moduleService = serviceScope.ServiceProvider.GetRequiredService<IModuleService>();
            var seedingServiceLogger = serviceScope.ServiceProvider.GetRequiredService<ILogger<ISeedingService>>();
            var moduleServiceLogger = serviceScope.ServiceProvider.GetRequiredService<ILogger<IModuleService>>();

            context.Database.Migrate();

            
            var awaiter = seedingService.LoadDataFromFiles().ConfigureAwait(true).GetAwaiter();
            while (!awaiter.IsCompleted)
            {
                seedingServiceLogger.LogInformation("Starting initialize db");
                Thread.Sleep(2000);
            }

            var moduleReaderAwaiter = moduleService.InitialModules().ConfigureAwait(true).GetAwaiter();

            while (!moduleReaderAwaiter.IsCompleted)
            {
                moduleServiceLogger.LogInformation("Reading modules");
                Thread.Sleep(2000);
            }

            return app;
        }

        #region Private Methods

        private static void CreateModules(this IServiceCollection services, IConfiguration configuration, IEnumerable<Modules.Module> modules)
        {
            // Create modules
            foreach (var module in modules)
            {
                module.Instance.CreateModule(services, configuration);
                if (module.ModuleType == ModuleType.SyncService)
                {
                    if (module.Instance is IModelBuilderSyncService service)
                        service.ReceiveData();
                }
                    
            }
        }

        private static void CreateProfiles(this IMapperConfigurationExpression cfg, IEnumerable<Modules.Module> modules)
        {
            // Create modules
            foreach (var module in modules)
            {
                var profiles = module.Instance.GetProfiles()?.ToList();
                if (profiles != null && profiles.Any())
                {
                    cfg.AddProfiles(profiles);
                }
            }
        }


        #endregion

    }
}
