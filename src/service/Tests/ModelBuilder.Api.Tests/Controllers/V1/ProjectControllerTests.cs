//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http.Json;
//using System.Threading.Tasks;
//using Mb.Models.Application;
//using Mb.Models.Data;
//using ModelBuilder.Fixtures;
//using Newtonsoft.Json;
//using Xunit;

//namespace ModelBuilder.Api.Tests.Controllers.V1
//{
//    public class ProjectControllerTests : WebTestFixture<TestStartup>
//    {
//        private static string Version = "v0.1";

//        [Fact]
//        public async Task Create_New_Project_Return_Of_Created_Project_Delete_Project_Returns_Success_Status_Code()
//        {
//            var createProject = new CreateProject
//            {
//                Name = "Automatic test",
//                Description = "Integration test"
//            };

//            var response = await Client.PostAsJsonAsync($"{Version}/project", createProject);
//            var content = await response.Content.ReadAsStringAsync();

//            // Project Created
//            Assert.True(response.IsSuccessStatusCode);

//            var data = JsonConvert.DeserializeObject<Project>(content);

//            // Project returned ok
//            Assert.True(data != null);

//            var deleteResponse = await Client.DeleteAsync($"{Version}/project/{data.Id}");

//            // Project deleted
//            Assert.True(deleteResponse.IsSuccessStatusCode);
//        }

//        [Fact]
//        public async Task Project_Search_With_And_Without_Search_String_Returns_Success_Status_Code()
//        {
//            var searchString = "";
//            var response = await Client.GetAsync($"{Version}/project/search?name={searchString}");
//            Assert.True(response.IsSuccessStatusCode);

//            searchString = "bare noe tull";
//            response = await Client.GetAsync($"{Version}/project/search?name={searchString}");
//            Assert.True(response.IsSuccessStatusCode);
//        }

//        [Fact]
//        public async Task Project_Get_By_Id_Returns_Success_Status_Code()
//        {
//            const string searchString = "";
//            var response = await Client.GetAsync($"{Version}/project/search?name={searchString}");
            
//            Assert.True(response.IsSuccessStatusCode);

//            var content = await response.Content.ReadAsStringAsync();
//            var data = JsonConvert.DeserializeObject<List<ProjectSimple>>(content);

//            Assert.True(data != null);

//            if (data.Any())
//            {
//                response = await Client.GetAsync($"{Version}/project/{data.First().Id}");
//                Assert.True(response.IsSuccessStatusCode);
//            }
//        }
//    }
//}
