using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;

namespace Mb.Models.Application
{
    public class CommitPackageAm
    {
        [Required]
        public string ProjectId { get; set; }

        [EnumDataType(typeof(CommitStatus))]
        public CommitStatus CommitStatus { get; set; }

        [Required]
        public string Parser { get; set; }

        [Required]
        public string ReceivingDomain { get; set; }
    }
}