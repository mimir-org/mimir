using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.TypeEditor.EnumTypes
{
    public class Unit : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<AttributeType> AttributeTypes { get; set; }
    }
}
