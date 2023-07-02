using System;
using System.Collections.Generic;
using Mb.Models.Client;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Core.Controllers.temp
{
    public class ProjectSearchResultCm
    {
        public ICollection<ProjectCm> Projects { get; set; } = new List<ProjectCm>();

        public void CreateDummyData()
        {
            Projects.Add(new ProjectCm
            {
                Id = "1234",
                Description = "This is a description",
                Name = "Reidar test project",
                Updated = DateTime.Now.AddDays(-5),
                UpdatedBy = "reidar-liabo@gmail.com",
                Version = "1.0",
                Connections = new List<ConnectionCm>(),
                AspectObjects = CreateDummyAspectObjects(),
                Created = DateTime.Now,
                CreatedBy = "Reidar Liabø",
                SubProject = false
            });
        }

        private ICollection<AspectObjectCm> CreateDummyAspectObjects()
        {
            var obj = new List<AspectObjectCm>();

            obj.Add(new AspectObjectCm
            {
                Id = "3456",
                Created = DateTime.Now,
                CreatedBy = "Reidar Laibø",
                Aspect = Aspect.Function,
                AspectObjectType = AspectObjectType.Aspect,
                Attributes = new List<AttributeCm>
                {
                    new AttributeCm
                    {
                        Id = "hoig64tfd",
                        Name = "Test Attribute",
                        AspectObject = "3456"
                    }
                },
                Connectors = new List<ConnectorCm>
                {
                    new ConnectorPartOfCm
                    {
                        Id = "cp123",
                        AspectObject = "3456",
                        Name = "Part Of A",
                        Direction = ConnectorDirection.Output,
                        Inside = "fgerde-in",
                        Outside = "fgerde-out",
                    },
                    new ConnectorTerminalCm()
                    {
                        Id = "cp123",
                        AspectObject = "3456",
                        Name = "Part Of A",
                        Direction = ConnectorDirection.Output,
                        Inside = "fgerde-in",
                        Outside = "fgerde-out",
                        Attributes = new List<AttributeCm>(),
                        Color = "#CCCCCC",
                        
                    }
                }
            });

            return obj;
        }
    }

    
}
