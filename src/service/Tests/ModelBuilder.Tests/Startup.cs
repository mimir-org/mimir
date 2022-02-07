using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit.DependencyInjection;
using Xunit.DependencyInjection.Logging;

namespace ModelBuilder.Tests
{
    public class Startup
    {
        public void Configure(ILoggerFactory loggerFactory, ITestOutputHelperAccessor accessor) => loggerFactory.AddProvider(new XunitTestOutputLoggerProvider(accessor));

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddHttpContextAccessor();
            //services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

            //services.AddSingleton<IProjectRepository, FakeProjectRepository>();
            //services.AddSingleton<IAuthorizationService, AuthorizationService>();
        }
    }
}