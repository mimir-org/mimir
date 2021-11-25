using System;
using System.IO;
using Mb.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MicrosoftSqlServerModule.Models;

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

            var dataSource = Environment.GetEnvironmentVariable("DatabaseConfiguration_DataSource");
            var port = Environment.GetEnvironmentVariable("DatabaseConfiguration_Port");
            var initialCatalog = Environment.GetEnvironmentVariable("DatabaseConfiguration_InitialCatalog");
            var dbUser = Environment.GetEnvironmentVariable("DatabaseConfiguration_DbUser");
            var password = Environment.GetEnvironmentVariable("DatabaseConfiguration_Password");

            if (!string.IsNullOrEmpty(dataSource))
                dbConfig.DataSource = dataSource.Trim();

            if (!string.IsNullOrEmpty(port) && int.TryParse(port.Trim(), out var portAsInt))
                dbConfig.Port = portAsInt;

            if (!string.IsNullOrEmpty(initialCatalog))
                dbConfig.InitialCatalog = initialCatalog.Trim();

            if (!string.IsNullOrEmpty(dbUser))
                dbConfig.DbUser = dbUser.Trim();

            if (!string.IsNullOrEmpty(password))
                dbConfig.Password = password.Trim();

            services.AddSingleton(Options.Create(dbConfig));

            var connectionString = $@"Data Source={dbConfig.DataSource},{dbConfig.Port};Initial Catalog={dbConfig.InitialCatalog};Integrated Security=False;User ID={dbConfig.DbUser};Password='{dbConfig.Password}';TrustServerCertificate=True;MultipleActiveResultSets=True";

            services.AddDbContext<ModelBuilderDbContext>(options =>
            {
                //options.EnableSensitiveDataLogging();
                options.UseSqlServer(connectionString, sqlOptions => sqlOptions.MigrationsAssembly("ModelBuilder.Core"));
            });

            return services;
        }
    }
}
