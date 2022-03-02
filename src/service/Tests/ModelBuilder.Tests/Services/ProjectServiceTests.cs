using Xunit;

namespace ModelBuilder.Tests.Services
{
    public class ProjectServiceTests : IClassFixture<ProjectFixture>
    {
        private readonly ProjectFixture _projectFixture;

        public ProjectServiceTests(ProjectFixture projectFixture)
        {
            _projectFixture = projectFixture;
        }

        //TODO: Create project service tests here. We also need to create fake repositories
        [Fact]
        public void Create_Sub_Project_Returns_Same_Number_Nodes_After_Remap()
        {
            Assert.True(true);
        }
    }
}