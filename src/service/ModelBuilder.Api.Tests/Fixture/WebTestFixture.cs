using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Dynamic;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using WebMotions.Fake.Authentication.JwtBearer;

namespace ModelBuilder.Api.Tests.Fixture
{
    public class WebTestFixture<T> : IDisposable where T : TestStartup
    {
        protected readonly IHost server;
        protected readonly HttpClient client;

        public WebTestFixture()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var hostBuilder = new HostBuilder().ConfigureWebHost(configure =>
            {
                configure
                    .UseTestServer()
                    //.UseEnvironment("Local")
                    .UseConfiguration(configuration)
                    .UseStartup<T>()
                    .ConfigureTestServices(collection =>
                    {
                        collection.AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme).AddFakeJwtBearer();
                    });
            });

            server = hostBuilder.Start();
            client = server.GetTestClient();

            dynamic data = new ExpandoObject();
            data.sub = Guid.NewGuid();
            data.role = new[] { "sub_role", "admin" };
            

            client.SetFakeBearerToken((object)data);
        }

        public void Dispose()
        {
            client.Dispose();
            server.Dispose();
        }
    }
}