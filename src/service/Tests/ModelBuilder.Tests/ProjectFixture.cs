using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Data.Repositories;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Services.Contracts;
using Mb.Services.Services;
using MockQueryable.Moq;
using Moq;
using Newtonsoft.Json;

namespace ModelBuilder.Tests
{
    public class ProjectFixture : IDisposable
    {
        public ICommonRepository CommonRepository { get; set; }
        public ICollaborationPartnerRepository CollaborationPartnerRepository { get; set; }
        public IMapper Mapper { get; set; }
        public IRemapService RemapService { get; set; }

        public ProjectAm ProjectA { get; set; }
        public ProjectAm ProjectB { get; set; }

        /// <summary>
        /// Initial Fixture
        /// </summary>
        public ProjectFixture()
        {
            Setup();
            LoadData();
        }

        /// <summary>
        /// Teardown Fixture
        /// </summary>
        public void Dispose()
        {
        }

        /// <summary>
        /// Setup
        /// </summary>
        private void Setup()
        {
            SetupCollaborationPartnerRepository();
            //SetupProjectRepository();
            SetupMapper();
            CommonRepository = new CommonRepository(CollaborationPartnerRepository);
            RemapService = new RemapService(CommonRepository, Mapper);
            //ProjectService = new ProjectService(ProjectRepository, Mapper, null, null, null, CommonRepository, null, null, null, ILogger<>)
        }

        /// <summary>
        /// Setup Mock Mapper
        /// </summary>
        private void SetupMapper()
        {
            var mockMapper = new MapperConfiguration(cfg =>
            {
                /*cfg.AddProfile(new AutoMapperProfile());*/ //your automapperprofile 
            });

            Mapper = mockMapper.CreateMapper();
        }

        /// <summary>
        /// Setup Mock CollaborationPartnerRepository
        /// </summary>
        private void SetupCollaborationPartnerRepository()
        {
            var data = new List<CollaborationPartner>
            {
                new()
                {
                    Id = 1,
                    Current = true,
                    Domain = "equinor.com",
                    Iris = new List<string> {"rdf.equinor.com"}
                },
                new()
                {
                    Id = 2,
                    Current = false,
                    Domain = "hansa.no",
                    Iris = new List<string> {"hansa.no"}
                },
                new()
                {
                    Id = 3,
                    Current = false,
                    Domain = "aibel.com",
                    Iris = new List<string> {"rdf.aibel.com"}
                }
            };
            var collaborationPartnersMock = data.AsQueryable().BuildMock();

            var collaborationPartnerRepository = new Mock<ICollaborationPartnerRepository>();
            collaborationPartnerRepository.Setup(x => x.GetAll(true)).Returns(collaborationPartnersMock);
            CollaborationPartnerRepository = collaborationPartnerRepository.Object;
        }

        /// <summary>
        /// Load data from file
        /// </summary>
        private void LoadData()
        {
            ProjectA = ReadFile("ProjectA.json");
            ProjectB = ReadFile("ProjectB.json");
        }

        private ProjectAm ReadFile(string filename)
        {
            var filePathProjectA = $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/Data/{filename}";
            using var r = new StreamReader(filePathProjectA, Encoding.UTF8);
            var json = r.ReadToEnd();
            return JsonConvert.DeserializeObject<ProjectAm>(json);
        }
    }
}