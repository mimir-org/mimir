using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.TypeEditor.EnumTypes
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
