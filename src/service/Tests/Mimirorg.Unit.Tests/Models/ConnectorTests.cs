using Mb.Models.Application;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;

namespace ModelBuilder.Unit.Tests.Models;

public class ConnectorTests
{
    private readonly ConnectorRequest _terminal;

    public ConnectorTests()
    {
        _terminal = new ConnectorRequest
        {
            Id = Guid.NewGuid(),
            Name = "ConnectorTerminal",
            Attributes = null,
            Color = "#ffffff",
            Direction = ConnectorDirection.Input,
            BlockId = Guid.Empty,
            TerminalId = Guid.NewGuid()
        };
    }

    [Fact(Skip = "Must be rewritten after big refactoring of backend")]
    public void Terminal_Validates_Ok()
    {
        var validation = _terminal.ValidateObject();
        Assert.True(validation.IsValid);
    }

    [Fact]
    public void Missing_Id_And_Iri_Is_Not_Valid()
    {
        var obj = _terminal.DeepCopy();
        obj.Id = Guid.Empty;

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

    //[Theory]
    //[InlineData((ConnectorDirection) 1000)]
    //[InlineData(ConnectorDirection.Input)]
    //public void Enum_Value_Out_Of_Range_Validate_False(ConnectorDirection connectorType)
    //{
    //    var obj = _terminal.DeepCopy();
    //    obj.Direction = connectorType;
    //    var validation = obj.ValidateObject();
    //    Assert.False(validation.IsValid);
    //}

    //[Theory]
    //[InlineData("1234", true)]
    //[InlineData(null, true)]
    //[InlineData(null, false)]
    //public void TerminalTypeId_Or_TerminalTypeIri_Must_Be_Set(string terminalType, bool result)
    //{
    //    var obj = _terminal.DeepCopy();
    //    obj.TerminalType = terminalType;

    //    var validation = obj.ValidateObject();

    //    if (result)
    //        Assert.True(validation.IsValid);
    //    else
    //        Assert.False(validation.IsValid);
    //}
}