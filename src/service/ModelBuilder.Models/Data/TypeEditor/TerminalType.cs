using System.Collections.Generic;
using Mb.Models.Const;
using Mb.Models.Data.Enums;

namespace Mb.Models.Data.TypeEditor
{
    public class TerminalType
    {
        public string Id { get; set; }
        public string Iri => GlobalSettings.IriTerminalTypePrefix + Id;
        public string Name { get; set; }
        public string Color { get; set; }

        public string TerminalCategoryId { get; set; }
        public TerminalCategory TerminalCategory { get; set; }

        public ICollection<AttributeType> Attributes { get; set; }
        public ICollection<NodeTypeTerminalType> NodeTypes { get; set; }
        public ICollection<InterfaceType> InterfaceTypes { get; set; }
        public ICollection<TransportType> TransportTypes { get; set; }
    }
}