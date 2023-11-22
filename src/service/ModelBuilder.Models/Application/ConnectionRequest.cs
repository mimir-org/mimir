using Mb.Models.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application;

#region ConnectionAm

public class ConnectionRequest : IValidatableObject
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string FromConnector { get; set; }
    [Required]
    public string ToConnector { get; set; }
    [Required]
    public Guid MainProject { get; set; }
    [Required]
    public Guid Project { get; set; }

    public ICollection<HandleRequest> Handles { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return new List<ValidationResult>();
    }
}

#endregion ConnectionAm

#region ConnectionTerminalAm

public class ConnectionTerminalAm : ConnectionRequest
{
    public string TerminalType { get; set; }
    public string TerminalParentType { get; set; }
}

#endregion ConnectionTerminalAm

#region ConnectionRelationAm

public abstract class ConnectionRelationAm : ConnectionRequest
{
}

#endregion ConnectionRelationAm

#region ConnectionFulfilledByAm

public class ConnectionFulfilledByAm : ConnectionRelationAm
{
}

#endregion ConnectionFulfilledByAm

#region ConnectionHasLocationAm

public class ConnectionHasLocationAm : ConnectionRelationAm
{
}

#endregion ConnectionHasLocationAm

#region ConnectionPartOfAm

public class ConnectionPartOfAm : ConnectionRelationAm
{
}

#endregion ConnectionPartOfAm