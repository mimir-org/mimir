using System.Collections.Generic;

namespace Mb.Models.Application
{
    public class CombinedAttributeFilter
    {
        public string Name { get; set; }
        public ICollection<CombinedAttribute> CombinedAttributes { get; set; }
    }
}