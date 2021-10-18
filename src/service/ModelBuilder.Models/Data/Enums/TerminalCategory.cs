using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class TerminalCategory : EnumBase
    {
        public string Color { get; set; }

        [JsonIgnore]
        public virtual ICollection<Terminal> Terminals { get; set; }

        [JsonIgnore]
        public virtual ICollection<TerminalType> TerminalTypes { get; set; }
    }
}
