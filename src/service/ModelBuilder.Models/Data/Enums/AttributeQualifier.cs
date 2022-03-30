using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class AttributeQualifier : EnumBase
    {

        [JsonIgnore]
        public virtual ICollection<AttributeType> AttributeTypes { get; set; }
    }
}