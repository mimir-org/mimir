using System;
using System.Collections.Generic;

namespace Mb.Core.Controllers.temp
{
    public class ProjectSearchResultCm
    {
        public ICollection<ProjectItemCm> Projects { get; set; } = new List<ProjectItemCm>();

        public void CreateDummyData()
        {
            Projects.Add(new ProjectItemCm
            {
                Id = "1234",
                Iri = "https://runir.net/1234",
                Description = "This is a description",
                Domain = "runir.net",
                Name = "Reidar test project",
                ProjectOwner = "Reidar Liabø",
                Updated = DateTime.Now.AddDays(-5),
                UpdatedBy = "reidar-liabo@gmail.com",
                Version = "1.0"
            });
        }
    }

    public class ProjectItemCm
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public DateTime Updated { get; set; }
        public string UpdatedBy { get; set; }
    }
}
