using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class EnumBase
    {
        public virtual string Name { get; set; }
        [JsonIgnore]
        public string InternalType { get; internal set; }
        public virtual string Description { get; set; }
        public virtual string SemanticReference { get; set; }

        public EnumBase()
        {
            InternalType = GetType().FullName;
        }
    }
}
