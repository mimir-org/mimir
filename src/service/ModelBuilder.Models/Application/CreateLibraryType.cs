using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Application
{
    public class CreateLibraryType : IValidatableObject
    {
        [Required]
        public string Name { get; set; }

        [EnumDataType(typeof(Status))]
        public Status Status { get; set; }

        [EnumDataType(typeof(Aspect))]
        public Aspect Aspect { get; set; }

        [EnumDataType(typeof(ObjectType))]
        public ObjectType ObjectType { get; set; }

        public string SemanticReference { get; set; }

        [Required]
        public string RdsId { get; set; }

        public ICollection<TerminalTypeItem> TerminalTypes { get; set; }

        public ICollection<string> AttributeTypes { get; set; }

        public string TerminalTypeId { get; set; }

        [JsonIgnore]
        public string Key => $"{Name}-{RdsId}";

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if ((ObjectType == ObjectType.Interface || ObjectType == ObjectType.Transport) && string.IsNullOrEmpty(TerminalTypeId))
            {
                yield return new ValidationResult(

                    "If object type is of type interface or transport, TerminalTypeId must be set.",
                    new List<string> { "TerminalTypeId" }
                );
            }
        }
    }
}
