using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Application
{
    public class CreateRds
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string RdsCategoryId { get; set; }
        public string SemanticReference { get; set; }
        public Aspect Aspect { get; set; }

        [JsonIgnore]
        public string Key => $"{Code}-{RdsCategoryId}";
    }
}
