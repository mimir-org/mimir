﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Mb.Models.Application
{
    public class CompositeTypeAm
    {
        [Required]
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public ICollection<string> AttributeTypes { get; set; }

        [JsonIgnore]
        public string Key => $"{Name}";
    }
}
