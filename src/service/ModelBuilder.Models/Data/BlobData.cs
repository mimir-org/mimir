using System.Text.Json.Serialization;
using Mb.Models.Data.Enums;

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
    }
}
