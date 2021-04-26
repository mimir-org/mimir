﻿using System.Collections.Generic;
using Mb.Core.Enums;

namespace Mb.Core.Models
{
    public class Edge
    {
        public string Id { get; set; }
        public string FromConnector { get; set; }
        public string ToConnector { get; set; }
        public string FromNode { get; set; }
        public string ToNode { get; set; }
        public NodeType ParentType { get; set; }
        public string ParentName { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
    }
}