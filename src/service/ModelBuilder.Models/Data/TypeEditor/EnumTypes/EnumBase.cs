using Newtonsoft.Json;

namespace Mb.Models.Data.TypeEditor.EnumTypes
{
    public class EnumBase
    {
        public string Id { get; set; }
        public string Name { get; set; }
        
        [JsonIgnore]
        public string InternalType { get; internal set; }
        public virtual string Description { get; set; }
        public virtual string SemanticReference { get; set; }

        public EnumBase()
        {
            InternalType = GetType().FullName;
        }

        [JsonIgnore]
        public virtual string Key => $"{Name}-{InternalType}";
    }
}
