using Mb.Api;
using Mb.Models.Configurations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ModelBuilder.Setup
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Startup>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                // remove the existing context configuration
                var descriptors = services.Where(d => d.ServiceType == typeof(DbContextOptions<ModelBuilderDbContext>)).ToList();
                if (descriptors.Any())
                {
                    foreach (var descriptor in descriptors)
                    {
                        services.Remove(descriptor);
                    }
                }

                services.AddDbContext<ModelBuilderDbContext>(options => options.UseInMemoryDatabase("TestDB"));
                services.AddAuthentication("IntegrationUser").AddScheme<AuthenticationSchemeOptions, IntegrationTestAuthenticationHandler>("IntegrationUser", options => { });
            });
        }
    }
}
