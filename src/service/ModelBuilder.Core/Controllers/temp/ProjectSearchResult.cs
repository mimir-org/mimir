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
                Id = "example.com_1234",
                Description = "This is a description",
                Name = "Reidar test project",
                Updated = DateTime.Now.AddDays(-5),
                UpdatedBy = "reidar-liabo@gmail.com",
                Version = "1.0",
                Connections = new List<ConnectionCm>(),
                Blocks = CreateDummyBlocks(),
                Created = DateTime.Now,
                CreatedBy = "Reidar Liabø",
                SubProject = false
            });
        }

        private ICollection<BlockCm> CreateDummyBlocks()
        {
            var obj = new List<BlockCm>();

            obj.Add(new BlockCm
            {
                Id = "example.com_3456",
                Created = DateTime.Now,
                CreatedBy = "Reidar Laibø",
                Aspect = Aspect.Function,
                BlockType = BlockType.Aspect,
                Attributes = new List<AttributeCm>
                {
                    new AttributeCm
                    {
                        Id = "example.com_hoig64tfd",
                        Name = "Test Attribute",
                        Block = "example.com_3456"
                    }
                },
                Connectors = new List<ConnectorCm>
                {
                    new ConnectorPartOfCm
                    {
                        Id = "example.com_cp123",
                        Block = "example.com_3456",
                        Name = "Part Of A",
                        Direction = ConnectorDirection.Output,
                        Inside = "example.com_fgerde-in",
                        Outside = "example.com_fgerde-out",
                    },
                    new ConnectorTerminalCm()
                    {
                        Id = "example.com_cp234",
                        Block = "example.com_3456",
                        Name = "Part Of A",
                        Direction = ConnectorDirection.Output,
                        Inside = "example.com_fge2rde-in",
                        Outside = "example.com_fge2rde-out",
                        Attributes = new List<AttributeCm>(),
                        Color = "#CCCCCC",

                    }
                }
            });

            return obj;
        }
    }
}