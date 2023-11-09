using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application;

//#region ConnectorAm

public class ConnectorAm
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }    
    [Required]
    public ConnectorDirection Direction { get; set; }
    [Required]
    public Guid Inside { get; set; }
    [Required]
    public Guid Outside { get; set; }
    [Required]
    public Guid Block { get; set; }
    [Required]
    public RelationType Discriminator { get; set; } = RelationType.NotSet;

    //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    //{
    //    return new List<ValidationResult>();
    //}
}

//#endregion ConnectorAm

//#region ConnectorTerminalAm

//public class ConnectorTerminalAm : ConnectorAm, IValidatableObject
//{
//    //[Required]
//    //public string TerminalType { get; set; }    
//    //public string ReferenceType { get; set; }
//    //public ICollection<AttributeAm> Attributes { get; set; }

//    //public new IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
//    //{
//    //    var validations = new List<ValidationResult>();

//    //    if (Attributes != null)
//    //        validations.AddRange(Attributes.SelectMany(attributeAm => attributeAm.Validate(validationContext)));

//    //    return validations;
//    //}
//}

//#endregion ConnectorTerminalAm

//#region ConnectorRelationAm

//public abstract class ConnectorRelationAm : ConnectorAm
//{
//}

//#endregion ConnectorRelationAm

//#region ConnectorFulfilledByAm

//public class ConnectorFulfilledByAm : ConnectorRelationAm
//{
//}

//#endregion ConnectorFulfilledByAm

//#region ConnectorHasLocationAm

//public class ConnectorHasLocationAm : ConnectorRelationAm
//{
//}

//#endregion ConnectorHasLocationAm

//#region ConnectorPartOfAm

//public class ConnectorPartOfAm : ConnectorRelationAm
//{
//}

//#endregion ConnectorPartOfAm