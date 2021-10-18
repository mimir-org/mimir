using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class BuildStatus : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<Node> Nodes { get; set; }
    }
}
