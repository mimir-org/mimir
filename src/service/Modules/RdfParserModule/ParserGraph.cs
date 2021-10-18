﻿using System;
using System.Collections.Generic;
namespace RdfParserModule
{
    public class ParserGraph
    {
        public string Id { get; set; }
        public string NormalId { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public bool IsSubProject { get; set; }
        public string Version { get; set; }
        public ICollection<ParserNode> Nodes { get; set; }
        public ICollection<ParserEdge> Edges { get; set; }

        public ParserNode GetNode(string nodeId)
        {
            foreach (var node in Nodes)
            {
                if (node.Id == nodeId)
                {
                    return node;
                }
            }

            throw new Exception("No such node found");
        }

        public override string ToString()
        {
            return "Project_" + Id;
        }
    }
}