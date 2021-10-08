using System.Collections.Generic;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class Purpose : EnumBase
    {
        public Discipline Discipline { get; set; }
        public override string Key => $"{Name}-{InternalType}-{Discipline}";
        
        [JsonIgnore]
        public virtual ICollection<LibraryType> LibraryTypes { get; set; }
    }
}
