using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace ModelBuilder.Api.Tests.Fixture
{
    public class WebTestFixture<T> : IDisposable where T : TestStartup
    {
        protected readonly IHost server;
        protected readonly HttpClient client;

        public WebTestFixture()
        {
            var configuration = new ConfigurationBuilder()
                //.AddJsonFile("appsettings.json")
                .Build();

            var hostBuilder = new HostBuilder().ConfigureWebHost(configure =>
            {
                configure
                .UseTestServer()
                //.UseEnvironment("Local")
                .UseConfiguration(configuration)
                .UseStartup<T>();
            });

            server = hostBuilder.Start();
            client = server.GetTestClient();
        }

        public void Dispose()
        {
            client.Dispose();
            server.Dispose();
        }
    }
}