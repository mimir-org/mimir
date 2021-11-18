using System.Collections.Generic;

namespace RdfParserModule
{
    public class ParserAttribute
    {
        public string Iri { get; set; }
        public string Domain { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string SelectedUnitId { get; set; }
        public string AttributeTypeId { get; set; }
        public string AttributeTypeIri { get; set; }
        public string ConnectorIri { get; set; }
        public string NodeIri { get; set; }
        public string TransportIri { get; set; }
        public string SimpleIri { get; set; }
        public ICollection<ParserUnit> Units { get; set; }
    }
}
