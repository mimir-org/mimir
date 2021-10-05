using System;
using System.Collections.Generic;
namespace RdfParserModule
{
    public class ParserNode
    {
        public string Prefix { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Label { get; set; }
        public string Rds { get; set; }
        public string SemanticReference { get; set; }
        public bool IsLocked { get; set; }
        public string StatusId { get; set; }
        public string MasterProjectId { get; set; }
        public string Aspect { get; set; }
        public bool IsRoot { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public bool IsTransport { get; set; }
        public ICollection<ParserTerminal> Terminals { get; set; }
        public ICollection<ParserEdge> Edges { get; set; }
        public ParserNode HasParent { get; set; }
        public ParserNode HasLocation { get; set; }
        public ParserNode FulfilledBy { get; set; }

        public override string ToString()
        {
            return Label ?? Id;
        }
    }
}
