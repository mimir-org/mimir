using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RdfParserModule
{
    public class ParserNode
    {
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
        public ICollection<ParserTerminal> Terminals { get; set; }
    }
}
