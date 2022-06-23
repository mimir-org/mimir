using System;
using System.Collections.Generic;
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
                options.UseSqlServer(dbConfig.ConnectionString, sqlOptions =>
                {
                    sqlOptions.MigrationsAssembly("ModelBuilder.Core");
                    var retryCount = 1;
                    var retryInterval = 10;

                    if (dbConfig.ConnectRetryCount > 0)
                        retryCount = dbConfig.ConnectRetryCount;

                    if (dbConfig.ConnectRetryInterval is >= 1 and <= 60)
                        retryInterval = dbConfig.ConnectRetryInterval;

                    sqlOptions.EnableRetryOnFailure(retryCount, TimeSpan.FromSeconds(retryInterval), new List<int>());
                });
            });

            return services;
        }
    }
}