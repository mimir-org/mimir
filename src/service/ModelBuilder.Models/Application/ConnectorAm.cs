using System.ComponentModel.DataAnnotations;
using Mimirorg.Common.Attributes;
using Mb.Models.Enums;
using Mimirorg.Common.Extensions;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Application
{
    public class ConnectorAm
    {
        [RequiredOne(nameof(Id))]
        public string Id { get; set; }
        public string Inside { get; set; }
        public string Outside { get; set; }
        public string Project { get; set; }

        public string Domain => Id.ResolveDomain();

        [Required]
        public string Name { get; set; }

        [EnumDataType(typeof(ConnectorDirection))]
        public ConnectorDirection Direction { get; set; }

        [EnumDataType(typeof(ConnectorVisibility))]
        public ConnectorVisibility ConnectorVisibility { get; set; }

        public string AspectObject { get; set; }

        public bool IsRequired { get; set; }
    }
}