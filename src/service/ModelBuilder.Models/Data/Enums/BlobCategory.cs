using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class Purpose : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<BlobData> Purposes { get; set; }
    }
}
