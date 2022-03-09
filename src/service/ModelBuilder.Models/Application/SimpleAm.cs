using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class SimpleAm
    {
        public string Id { get; set; }
        public string Iri { get; set; }

        [Required]
        public string Name { get; set; }
        public virtual ICollection<AttributeAm> Attributes { get; set; }

        public virtual string NodeIri { get; set; }
        public virtual string NodeId { get; set; }
    }
}