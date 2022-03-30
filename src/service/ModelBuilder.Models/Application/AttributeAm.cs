using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;
using Mb.Models.Extensions;

namespace Mb.Models.Application
{
    public class AttributeAm
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();

        [Required]
        public string Entity { get; set; }
        public string Value { get; set; }

        // Type
        public string AttributeTypeId { get; set; }
        public string AttributeTypeIri { get; set; }

        // Unit
        public string SelectedUnitId { get; set; }
        public virtual ICollection<UnitAm> Units { get; set; }

        // Qualifiers
        [Required]
        public string Qualifier { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string Condition { get; set; }

        [Required]
        public string Format { get; set; }

        // References
        public string TerminalId { get; set; }
        public string TerminalIri { get; set; }

        public string NodeId { get; set; }
        public string NodeIri { get; set; }

        public string TransportId { get; set; }
        public string TransportIri { get; set; }

        public string InterfaceId { get; set; }
        public string InterfaceIri { get; set; }

        public string SimpleId { get; set; }
        public string SimpleIri { get; set; }

        public ICollection<string> SelectValues { get; set; }
        public SelectType SelectType { get; set; }
        public Discipline Discipline { get; set; }

        public virtual HashSet<string> Tags { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }
    }
}