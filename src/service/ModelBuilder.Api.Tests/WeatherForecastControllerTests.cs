using ModelBuilder.Api.Tests.Fixture;
using System.Threading.Tasks;
using Xunit;

namespace ModelBuilder.Api.Tests
{
    public class WeatherForecastControllerTests : WebTestFixture<TestStartup>
    {
        [Fact]
        public async Task GetWeatherTest()
        {
            var response = await client.GetAsync("WeatherForecast");

            Assert.True(response.IsSuccessStatusCode);

            var content = await response.Content.ReadAsStringAsync();
        }
    }
}
