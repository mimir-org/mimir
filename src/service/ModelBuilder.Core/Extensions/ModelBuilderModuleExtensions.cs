using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using AutoMapper;
using AzureActiveDirectoryModule.Models;
using Mb.Core.Profiles;
using Mb.Data.Contracts;
using Mb.Data.Repositories;
using Mb.Models.Abstract;
using Mb.Models.Attributes;
using Mb.Models.Configurations;
using Mb.Models.Data.Hubs;
using Mb.Models.Enums;
using Mb.Models.Settings;
using Mb.Services.Contracts;
using Mb.Services.HostedServices;
using Mb.Services.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using Module = Mb.Models.Common.Module;

namespace Mb.Core.Extensions;

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

    public static IServiceCollection AddModelBuilderModule(this IServiceCollection services,
        IConfiguration configuration)
    {
        // ModelBuilder Configurations
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory());

        builder.AddJsonFile("appsettings.json");
        builder.AddJsonFile($"appsettings.{environment}.json", true);
        builder.AddJsonFile("appsettings.local.json", true);
        builder.AddEnvironmentVariables();
        builder.Build();

        // ModelBuilder Application Settings
        var config = builder.Build();

        var modelBuilderConfiguration = new ApplicationSetting();
        var modelBuilderSection = config.GetSection(nameof(ApplicationSetting));
        modelBuilderSection.Bind(modelBuilderConfiguration);
        services.AddSingleton(Options.Create(modelBuilderConfiguration));

        services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = false; });

        // Dependency injection
        services.AddMemoryCache();
        services.AddSingleton<ICacheRepository, InMemoryCacheRepository>();
        services.AddHostedService<TimedCacheService>();
        services.AddHostedService<TimedCleanupService>();
        services.AddSingleton<IHttpRepository, HttpRepository>();

        services.AddScoped<ICommonRepository, CommonRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IAspectObjectRepository, AspectObjectRepository>();
        services.AddScoped<IConnectionRepository, ConnectionRepository>();
        services.AddScoped<IConnectorRepository, ConnectorRepository>();
        services.AddScoped<IAttributeRepository, AttributeRepository>();
        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IVersionRepository, VersionRepository>();
        services.AddScoped<IWebSocketRepository, WebSocketRepository>();
        services.AddScoped<ILibraryRepository, LibraryRepository>();
        services.AddScoped<IModelBuilderProcRepository, ModelBuilderProcRepository>();

        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IAspectObjectService, AspectObjectService>();
        services.AddScoped<IConnectorService, ConnectorService>();
        services.AddScoped<ILibraryService, LibraryService>();
        services.AddScoped<ICommonService, CommonService>();
        services.AddScoped<IRemapService, RemapService>();
        services.AddScoped<IVersionService, VersionService>();
        services.AddScoped<IProjectFileService, ProjectFileService>();
        services.AddScoped<ICooperateService, CooperateService>();
        services.AddScoped<ILockService, LockService>();

        services.AddHttpContextAccessor();
        services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
        var provider = services.BuildServiceProvider();

        // Automatic dependency injection for all modules
        var moduleService = new ModuleService();
        services.AddServicesWithAttributeOfType<SingletonAttribute>(
            moduleService.Assemblies ?? new List<Assembly>());
        services.AddServicesWithAttributeOfType<ScopeAttribute>(moduleService.Assemblies ?? new List<Assembly>());
        services.AddServicesWithAttributeOfType<TransientAttribute>(
            moduleService.Assemblies ?? new List<Assembly>());

        services.AddSingleton<IModuleService>(_ => moduleService);
        var modules = moduleService.Modules.Where(x =>
            x.ModuleType == ModuleType.Plugin ||
            x.ModuleType == ModuleType.SyncService ||
            x.ModuleType == ModuleType.Parser).ToList();

        // Auto-mapper
        var cfg = new MapperConfigurationExpression();
        cfg.AddProfile(new AspectObjectProfile());
        cfg.AddProfile(new AttributeProfile());
        cfg.AddProfile(new ConnectionProfile());
        cfg.AddProfile(new ConnectorProfile());
        cfg.AddProfile(new LockProfile(provider.GetService<IHttpContextAccessor>()));
        cfg.AddProfile(new ProjectProfile(provider.GetService<IHttpContextAccessor>(), provider.GetService<ICommonRepository>()));
        cfg.AddProfile(new QualifierProfile());
        cfg.AddProfile(new UnitProfile());
        cfg.AddProfile(new VersionProfile());

        // Create profiles
        cfg.CreateProfiles(provider, modules);

        var mapperConfig = new MapperConfiguration(cfg);
        services.AddSingleton(_ => mapperConfig.CreateMapper());

        // Add modules
        services.CreateModules(provider, configuration, modules);
        services.AddSignalR();

        // Add application settings

        return services;
    }

    public static IApplicationBuilder UseModelBuilderModule(this IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
        var moduleService = serviceScope.ServiceProvider.GetRequiredService<IModuleService>();
        var logger = serviceScope.ServiceProvider.GetRequiredService<ILogger<IModuleService>>();

        context.Database.Migrate();
        var moduleReaderAwaiter = moduleService.InitialModules().ConfigureAwait(true).GetAwaiter();

        while (!moduleReaderAwaiter.IsCompleted)
        {
            logger.LogInformation("Reading modules");
            Thread.Sleep(2000);
        }

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<ModelBuilderHub>("/hub/modelbuilder");
        });

        logger.LogInformation(moduleService.ToString());

        var applicationSetting = serviceScope.ServiceProvider.GetRequiredService<IOptions<ApplicationSetting>>();
        logger.LogInformation(applicationSetting?.Value?.ToString());

        var databaseConfiguration = serviceScope.ServiceProvider.GetRequiredService<IOptions<DatabaseConfiguration>>();
        logger.LogInformation(databaseConfiguration?.Value?.ToString());

        var azureActiveDirectoryConfiguration = serviceScope.ServiceProvider.GetRequiredService<IOptions<AzureActiveDirectoryConfiguration>>();
        logger.LogInformation(azureActiveDirectoryConfiguration?.Value?.ToString());

        return app;
    }

    #region Private Methods

    private static void CreateModules(this IServiceCollection services, IServiceProvider provider,
        IConfiguration configuration, IEnumerable<Module> modules)
    {
        var logger = provider.GetService<ILogger<IModuleService>>();

        // Create modules
        foreach (var module in modules)
        {
            try
            {
                module.Instance.CreateModule(services, configuration);
                if (module.ModuleType == ModuleType.SyncService)
                {
                    if (module.Instance is IModelBuilderSyncService service)
                        service.ReceiveData();
                }
            }
            catch (Exception e)
            {
                logger?.LogError($"Module error: ({module?.ModuleDescription?.Name}), {e.Message}");
            }
        }
    }

    private static void CreateProfiles(this IMapperConfigurationExpression cfg, IServiceProvider provider,
        IEnumerable<Module> modules)
    {
        var logger = provider.GetService<ILogger<IModuleService>>();

        // Create modules
        foreach (var module in modules)
        {
            try
            {
                var profiles = module.Instance.GetProfiles()?.ToList();
                if (profiles != null && profiles.Any())
                {
                    cfg.AddProfiles(profiles);
                }
            }
            catch (Exception e)
            {
                logger?.LogError($"Module error: ({module?.ModuleDescription?.Name}), {e.Message}");
            }
        }
    }

    #endregion
}