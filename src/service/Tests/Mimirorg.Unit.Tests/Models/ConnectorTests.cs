using Mb.Models.Application;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;

namespace ModelBuilder.Unit.Tests.Models
{
    public class ConnectorTests
    {
        private readonly ConnectorTerminalAm _terminal;

        public ConnectorTests()
        {
            _terminal = new ConnectorTerminalAm
            {
                Id = "runir.com_12345",
                Iri = "https://dummy.com/ID12345",
                Name = "TerminalConnector",
                Attributes = null,
                Color = "#ffffff",
                Type = ConnectorDirection.Input,
                ConnectorVisibility = ConnectorVisibility.None,
                NodeId = null,
                NodeIri = null,
                IsRequired = false,
                TerminalTypeIri = "https://rdf.runir.com/1234",
                TerminalParentTypeName = "TerminalParent",
                TerminalTypeId = "12345"
            };
        }

        [Fact]
        public void Terminal_Validates_Ok()
        {
            var validation = _terminal.ValidateObject();
            Assert.True(validation.IsValid);
        }

        [Fact]
        public void Missing_Id_And_Iri_Is_Not_Valid()
        {
            var obj = _terminal.DeepCopy();
            obj.Id = "";
            obj.Iri = "";

            var validation = obj.ValidateObject();
            Assert.False(validation.IsValid);
        }

        [Fact]
        public void Name_Is_Required()
        {
            var obj = _terminal.DeepCopy();
            obj.Name = "";
            var validation = obj.ValidateObject();
            Assert.False(validation.IsValid);
        }

        [Theory]
        [InlineData((ConnectorDirection) 1000, ConnectorVisibility.InputVisible)]
        [InlineData(ConnectorDirection.Input, (ConnectorVisibility) 1000)]
        public void Enum_Value_Out_Of_Range_Validate_False(ConnectorDirection connectorType, ConnectorVisibility connectorVisibility)
        {
            var obj = _terminal.DeepCopy();
            obj.Type = connectorType;
            obj.ConnectorVisibility = connectorVisibility;
            var validation = obj.ValidateObject();
            Assert.False(validation.IsValid);
        }

        [Theory]
        [InlineData("1234", "https://rdf.dummy.com/ID1234", true)]
        [InlineData("1234", null, true)]
        [InlineData(null, "https://rdf.dummy.com/ID1234", true)]
        [InlineData(null, null, false)]
        public void TerminalTypeId_Or_TerminalTypeIri_Must_Be_Set(string terminalTypeId, string terminalTypeIri, bool result)
        {
            var obj = _terminal.DeepCopy();
            obj.TerminalTypeId = terminalTypeId;
            obj.TerminalTypeIri = terminalTypeIri;

            var validation = obj.ValidateObject();

            if (result)
                Assert.True(validation.IsValid);
            else
                Assert.False(validation.IsValid);
        }
    }
}