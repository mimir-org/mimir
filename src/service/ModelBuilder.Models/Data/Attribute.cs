﻿using System.Collections.Generic;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class Attribute
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public Unit Unit { get; set; }
        public AttributeQualifier Qualifier { get; set; }
        public AttributeSource Source { get; set; }
        public AttributeCondition Condition { get; set; }
        public AttributeFormat Format { get; set; }
        public ICollection<Unit> Units { get; set; }


        public virtual string NodeId { get; set; }
        public virtual Node Node { get; set; }
    }
}