using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Mb.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddConsole();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseKestrel(options =>
                    {
                        options.Limits.MaxRequestBodySize = int.MaxValue;
                    });
                    webBuilder.UseStartup<Startup>()
                        .ConfigureAppConfiguration(configurationBuilder =>
                        {
                            configurationBuilder.AddJsonFile(
                                $"{Directory.GetCurrentDirectory()}/appsettings.local.json", true);

                        });
                });
    }
}