using System.Collections.Generic;
using Mb.Models.Data.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class BlobData
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public string CategoryId { get; set; }
        public BlobCategory Category { get; set; }

        [JsonIgnore]
        public virtual string Key => $"{Name}-{CategoryId}";

        [JsonIgnore]
        public virtual ICollection<Node> Nodes { get; set; }
    }
}
