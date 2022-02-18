using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models
{
    public class AttributeLibAm
    {
        public string ParentId { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public Aspect Aspect { get; set; }

        [Required]
        public Discipline Discipline { get; set; }

        public HashSet<string> Tags { get; set; }

        [Required]
        public SelectType Select { get; set; }

        public ICollection<string> SelectValues { get; set; }
        public ICollection<string> UnitIdList { get; set; }

        [Required]
        public string AttributeQualifier { get; set; }
        
        [Required]
        public string AttributeSource { get; set; }

        [Required]
        public string AttributeCondition { get; set; }

        [Required]
        public string AttributeFormat { get; set; }

        //[JsonIgnore]
        //public ICollection<UnitLibAm> ConvertToObject => Units?.Select(x => new UnitLibAm{ Name = x }).ToList();

        [JsonIgnore]
        public string Id => ($"{Name}-{Aspect}-{AttributeQualifier}-{AttributeSource}-{AttributeCondition}").CreateMd5();
    }
}
