using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Mb.Models.Application.TypeEditor
{
    public class SimpleTypeAm
    {
        [Required]
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<string> AttributeTypes { get; set; }

        [JsonIgnore]
        public string Key => $"{Name}";
    }
}
