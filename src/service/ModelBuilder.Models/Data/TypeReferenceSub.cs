using Mb.Models.Extensions;

namespace Mb.Models.Data
{
    public class TypeReferenceSub
    {
        public string Id => $"{Name}".CreateMd5();
        public string Name { get; set; }
        public string Iri { get; set; }
        public bool IsDefault { get; set; }
    }
}