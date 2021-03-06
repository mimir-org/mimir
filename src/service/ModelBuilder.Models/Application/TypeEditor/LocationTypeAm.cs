using System.Collections.Generic;

namespace Mb.Models.Application.TypeEditor
{
    public class LocationTypeAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual string SemanticReference { get; set; }
        public ICollection<LocationTypeAm> LocationSubTypes { get; set; }
    }
}