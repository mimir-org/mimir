using System.Collections.Generic;
using Mb.Models.Enums;

namespace RdfParserModule
{
    public class ParserNode
    {
        public string Prefix { get; set; }
        public string Iri { get; set; }
        public string Domain { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Label { get; set; }
        public string Rds { get; set; }
        public string SemanticReference { get; set; }
        public bool IsLocked { get; set; }
        public string StatusId { get; set; }
        public string MasterProjectIri { get; set; }
        public Aspect Aspect { get; set; }
        public bool IsRoot { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public bool IsTransport { get; set; }
        public ICollection<ParserConnector> Terminals { get; set; }
        public ICollection<ParserAttribute> Attributes { get; set; }
        public ICollection<ParserEdge> Edges { get; set; }
        public string parentId { get; set; }
        public ParserNode HasLocation { get; set; }
        public ParserNode FulfilledBy { get; set; }

        public decimal PositionX { get; set; }
        public decimal PositionY { get; set; }
        public decimal PositionBlockX { get; set; }
        public decimal PositionBlockY { get; set; }

        public override string ToString()
        {
            return Label ?? Iri;
        }
    }

    public class ParserTransport : ParserNode
    {
        public ParserTerminal InputTerminal { get; set; }
        public ParserTerminal OutputTerminal { get; set; }
        public string InputTerminalIri { get; set; }
        public string OutputTerminalIri { get; set; }
    }
}
