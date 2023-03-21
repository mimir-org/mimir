using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application
{
    #region ConnectorAm

    public class ConnectorAm : IValidatableObject
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public ConnectorDirection Direction { get; set; }
        [Required]
        public string Inside { get; set; }
        [Required]
        public string Outside { get; set; }
        [Required]
        public string Project { get; set; }
        [Required]
        public string AspectObject { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            return new List<ValidationResult>();
        }
    }

    #endregion ConnectorAm

    #region ConnectorTerminalAm

    public class ConnectorTerminalAm : ConnectorAm, IValidatableObject
    {
        [Required]
        public string Color { get; set; }
        [Required]
        public string TerminalType { get; set; }
        public string TerminalParentType { get; set; }
        public string ReferenceType { get; set; }
        public ICollection<AttributeAm> Attributes { get; set; }

        public new IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validations = new List<ValidationResult>();

            if (Attributes != null)
                validations.AddRange(Attributes.SelectMany(attributeAm => attributeAm.Validate(validationContext)));

            return validations;
        }
    }

    #endregion ConnectorTerminalAm

    #region ConnectorRelationAm

    public abstract class ConnectorRelationAm : ConnectorAm
    {
    }

    #endregion ConnectorRelationAm

    #region ConnectorFulfilledByAm

    public class ConnectorFulfilledByAm : ConnectorRelationAm
    {
    }

    #endregion ConnectorFulfilledByAm

    #region ConnectorHasLocationAm

    public class ConnectorHasLocationAm : ConnectorRelationAm
    {
    }

    #endregion ConnectorHasLocationAm

    #region ConnectorPartOfAm

    public class ConnectorPartOfAm : ConnectorRelationAm
    {
    }

    #endregion ConnectorPartOfAm
}