using System.Collections.Generic;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class Purpose : EnumBase
    {
        public Discipline Discipline { get; set; }

        [JsonIgnore]
        public virtual ICollection<BlobData> Purposes { get; set; }

        public override string Key => $"{Name}-{InternalType}-{Discipline}";
    }
}
