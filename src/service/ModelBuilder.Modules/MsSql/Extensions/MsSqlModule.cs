using System;
using System.IO;
using Mb.Core;
using Mb.Modules.MsSql.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Mb.Modules.MsSql.Extensions
{
    public static class MsSqlModule
    {
        public static IServiceCollection AddMsSqlServerModule(this IServiceCollection services)
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
                dbConfig.DataSource = dataSource;

            if (!string.IsNullOrEmpty(port) && int.TryParse(port, out var portAsInt))
                dbConfig.Port = portAsInt;

            if (!string.IsNullOrEmpty(initialCatalog))
                dbConfig.InitialCatalog = initialCatalog;

            if (!string.IsNullOrEmpty(dbUser))
                dbConfig.DbUser = dbUser;

            if (!string.IsNullOrEmpty(password))
                dbConfig.Password = password;

            services.AddSingleton(Options.Create(dbConfig));

            var connectionString = $@"Data Source={dbConfig.DataSource},{dbConfig.Port};Initial Catalog={dbConfig.InitialCatalog};Integrated Security=False;User ID={dbConfig.DbUser};Password='{dbConfig.Password}';MultipleActiveResultSets=True";

            services.AddDbContext<ModelBuilderDbContext>(options =>
                options.UseSqlServer(connectionString, sqlOptions =>
                    sqlOptions.MigrationsAssembly("ModelBuilder.Core")));

            return services;
        }
    }
}
