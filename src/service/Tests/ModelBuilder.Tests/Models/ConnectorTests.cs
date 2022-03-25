using System.Runtime.CompilerServices;
using Mb.Models.Application;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Xunit;

namespace ModelBuilder.Tests.Models
{
    public class ConnectorTests
    {
        [Fact]
        public void Terminal_Validates_Ok()
        {
            var connector = new TerminalAm
            {
                Id = "equinor.com_12345",
                Iri = "",
                Name ="Terminal",
                Attributes = null,
                Color = "#ffffff",
                Type = ConnectorType.Input,
                ConnectorVisibility = ConnectorVisibility.None,
                NodeId = null,
                NodeIri = null,
                IsRequired = false,
                TerminalTypeIri = "https://rdf.equinor.com/1234",
                RelationType = RelationType.NotSet,
                TerminalCategoryId = "12345",
                TerminalTypeId = "12345",
                SemanticReference = null
            };


            var validation = connector.ValidateObject();
            Assert.True(validation.IsValid);

        }
    }
}
