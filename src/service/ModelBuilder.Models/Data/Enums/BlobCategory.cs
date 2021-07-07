using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class BlobCategory : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<BlobData> Blobs { get; set; }
    }
}
