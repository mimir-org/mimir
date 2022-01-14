using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class BuildStatus : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Interface> Interfaces { get; set; }
        public virtual ICollection<Transport> Transports { get; set; }
        public virtual ICollection<LibraryType> LibraryTypes { get; set; }
    }
}