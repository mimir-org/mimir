﻿namespace RdfParserModule
{
    public class ParserEdge
    {
        public string Id { get; set; }
        public string FromConnectorId { get; set; }
        public string ToConnectorId { get; set; }
        public string FromNodeId { get; set; }
        public string ToNodeId { get; set; }
        public string MasterProjectId { get; set; }
        public ParserNode Transport { get; set; }
        public ParserNode Interface { get; set; }
    }
}
