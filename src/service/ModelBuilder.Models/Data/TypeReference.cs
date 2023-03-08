using System.Collections.Generic;

namespace Mb.Models.Data
{
    public class TypeReference
    {
        public string Name { get; set; }
        public string Iri { get; set; }
        public string Source { get; set; }
        public ICollection<TypeReferenceSub> Subs { get; set; }
    }
}