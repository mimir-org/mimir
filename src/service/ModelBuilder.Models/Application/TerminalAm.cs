using Mimirorg.Common.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Data;

namespace Mb.Models.Application
{
    public class TerminalAm : ConnectorAm
    {
        [Required]
        public string Color { get; set; }
        public string TerminalCategory { get; set; }

        [Required]
        public bool IsProxy { get; set; }

        [RequiredOne(nameof(TerminalTypeIri))]
        public string TerminalTypeId { get; set; }

        [ValidIri]
        [RequiredOne(nameof(TerminalTypeId))]
        public string TerminalTypeIri { get; set; }

        public ICollection<TypeReference> TypeReferences { get; set; }
    }
}