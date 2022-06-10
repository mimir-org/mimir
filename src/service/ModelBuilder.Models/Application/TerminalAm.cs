using Mimirorg.Common.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class TerminalAm : ConnectorAm
    {
        [Required]
        public string Color { get; set; }
        public string TerminalCategory { get; set; }

        [RequiredOne(nameof(TerminalTypeIri))]
        public string TerminalTypeId { get; set; }

        [ValidIri]
        [RequiredOne(nameof(TerminalTypeId))]
        public string TerminalTypeIri { get; set; }
    }
}