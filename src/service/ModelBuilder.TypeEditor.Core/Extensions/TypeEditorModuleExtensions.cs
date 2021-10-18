﻿using System.Threading;
using Mb.Models.Configurations;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Data.Repositories;
using Mb.TypeEditor.Services.Contracts;
using Mb.TypeEditor.Services.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Mb.TypeEditor.Core.Extensions
{
    public static class TypeEditorModuleExtensions
    {
        public static IServiceCollection AddTypeEditorModule(this IServiceCollection services, IConfiguration configuration)
        {
            // Dependency Injection
            services.AddScoped<IAttributeTypeRepository, AttributeTypeRepository>();
            services.AddScoped<ICompositeTypeRepository, CompositeTypeRepository>();
            services.AddScoped<IInterfaceTypeRepository, InterfaceTypeRepository>();
            services.AddScoped<ILibraryTypeRepository, LibraryTypeRepository>();
            services.AddScoped<INodeTypeRepository, NodeTypeRepository>();
            services.AddScoped<INodeTypeTerminalTypeRepository, NodeTypeTerminalTypeRepository>();
            services.AddScoped<ITerminalTypeRepository, TerminalTypeRepository>();
            services.AddScoped<ITransportTypeRepository, TransportTypeRepository>();
            services.AddScoped<ILibraryRepository, LibraryRepository>();
            services.AddScoped<IPredefinedAttributeRepository, PredefinedAttributeRepository>();
            services.AddScoped<IEnumBaseRepository, EnumBaseRepository>();
            services.AddScoped<IRdsRepository, RdsRepository>();
            services.AddSingleton<IFileRepository, JsonFileRepository>();
            services.AddScoped<IBlobDataRepository, BlobDataRepository>();

            services.AddScoped<ITerminalTypeService, TerminalTypeService>();
            services.AddScoped<ILibraryTypeService, LibraryTypeService>();
            services.AddScoped<ILibraryTypeFileService, LibraryTypeFileService>();
            services.AddScoped<IAttributeTypeService, AttributeTypeService>();
            services.AddScoped<IEnumService, EnumService>();
            services.AddScoped<IRdsService, RdsService>();
            services.AddScoped<ISeedingService, SeedingService>();
            services.AddScoped<IBlobDataService, BlobDataService>();


            return services;
        }

        public static IApplicationBuilder UseTypeEditorModule(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<ModelBuilderDbContext>();
            var seedingService = serviceScope.ServiceProvider.GetRequiredService<ISeedingService>();
            var seedingServiceLogger = serviceScope.ServiceProvider.GetRequiredService<ILogger<ISeedingService>>();
            context.Database.Migrate();


            var awaiter = seedingService.LoadDataFromFiles().ConfigureAwait(true).GetAwaiter();
            while (!awaiter.IsCompleted)
            {
                seedingServiceLogger.LogInformation("Starting initialize db");
                Thread.Sleep(2000);
            }
            return app;
        }
    }
}
