using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Attributes;
using Mb.Models.Enums;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class ConnectorAm
    {
        [RequiredOne(nameof(Iri))]
        public string Id { get; set; }

        [RequiredOne(nameof(Id))]
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();
        
        [Required]
        public string Name { get; set; }
        
        [EnumDataType(typeof(ConnectorType))]
        public ConnectorType Type { get; set; }
        
        public string SemanticReference { get; set; }

        [EnumDataType(typeof(ConnectorVisibility))]
        public ConnectorVisibility ConnectorVisibility { get; set; }

        public string NodeId { get; set; }
        public string NodeIri { get; set; }

        public bool IsRequired { get; set; }

        // Relation
        [EnumDataType(typeof(RelationType))]
        public RelationType RelationType { get; set; }

        // Terminal
        public string Color { get; set; }
        public string TerminalCategoryId { get; set; }
        public string TerminalTypeId { get; set; }
        public string TerminalTypeIri { get; set; }
        public virtual ICollection<AttributeAm> Attributes { get; set; }
    }
}