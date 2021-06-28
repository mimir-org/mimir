﻿using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.Enums
{
    public class Unit : EnumBase
    {
        [JsonIgnore]
        public virtual ICollection<AttributeType> AttributeTypes { get; set; }
    }
}
