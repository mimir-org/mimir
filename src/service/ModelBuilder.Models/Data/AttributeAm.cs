using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Data
{
    public class AttributeAm
    {
        [Required]
        public string Key { get; set; }

        [Required]
        public string Value { get; set; }
        
        public string Unit { get; set; }

        public AttributeTypeAm Type { get; set; }

        public AttributeInputTypeAm InputType { get; set; }

        [Required]
        public string NodeId { get; set; }
    }
}
