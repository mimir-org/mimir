using System;
using System.Dynamic;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebMotions.Fake.Authentication.JwtBearer;

namespace ModelBuilder.Fixtures
{
    public class WebTestFixture<T> : IDisposable where T : TestStartup
    {
        protected readonly IHost Server;
        protected readonly HttpClient Client;
        public IServiceProvider ServiceProvider;

        public WebTestFixture()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var hostBuilder = new HostBuilder().ConfigureWebHost(configure =>
            {
                configure
                    .UseTestServer()
                    .UseConfiguration(configuration)
                    .UseStartup<T>()
                    .ConfigureTestServices(collection =>
                    {
                        collection.AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme).AddFakeJwtBearer();
                    });
            });

            Server = hostBuilder.Start();
            Client = Server.GetTestClient();

            dynamic data = new ExpandoObject();
            data.sub = Guid.NewGuid();
            data.role = new[] { "Contributor", "Administrator", "Reader" };


            Client.SetFakeBearerToken((object) data);
            ServiceProvider = Server.Services;
        }

        public void Dispose()
        {
            Client.Dispose();
            Server.Dispose();
        }
    }
}