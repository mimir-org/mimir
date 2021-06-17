using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class RdsCategory : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<Rds> RdsList { get; set; }
    }
}
