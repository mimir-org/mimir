using System;
using System.IO;
using Mb.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace MicrosoftSqlServerModule
{
    public static class MicrosoftSqlServerModule
    {
        public static IServiceCollection AddMicrosoftSqlServerModule(this IServiceCollection services)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory());

            builder.AddJsonFile("appsettings.json");
            builder.AddJsonFile($"appsettings.{environment}.json", true);
            builder.AddJsonFile("appsettings.local.json", true);
            builder.AddEnvironmentVariables();

            var config = builder.Build();

            var dbConfig = new DatabaseConfiguration();
            var databaseConfigSection = config.GetSection("DatabaseConfiguration");
            databaseConfigSection.Bind(dbConfig);

            services.AddSingleton(Options.Create(dbConfig));

            services.AddDbContext<ModelBuilderDbContext>(options =>
            {
                options.UseSqlServer(dbConfig.ConnectionString,
                    sqlOptions => sqlOptions.MigrationsAssembly("ModelBuilder.Core"));
                //options.EnableSensitiveDataLogging();
                //options.ConfigureWarnings(w => w.Throw(RelationalEventId.MultipleCollectionIncludeWarning));
            });

            return services;
        }
    }
}