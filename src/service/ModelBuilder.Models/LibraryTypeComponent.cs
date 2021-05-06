using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models
{
    public class LibraryTypeComponent
    {
        public string Id { get; set; }
        public Aspect Aspect { get; set; }

        public ObjectType ObjectType { get; set; }
        public string TypeName { get; set; }
        public Status Status { get; set; }
        public string Rds { get; set; }
        public RdsCategory RdsCategory { get; set; }
        public ICollection<Terminal> Terminals { get; set; }
        public ICollection<AttributeType> Attributes { get; set; }
        public string Version { get; set; }

        [JsonIgnore]
        public string TerminalJson { get; set; }

        [JsonIgnore]
        public string AttributeJson { get; set; }

        public void CreateJsonData()
        {
            TerminalJson = Terminals != null && Terminals.Any() ? JsonConvert.SerializeObject(Terminals) : null;
            AttributeJson = Attributes != null && Attributes.Any() ? JsonConvert.SerializeObject(Attributes) : null;
        }

        public void CreateFromJsonData()
        {
            Terminals = string.IsNullOrEmpty(TerminalJson) ? null : JsonConvert.DeserializeObject<ICollection<Terminal>>(TerminalJson);
            Attributes = string.IsNullOrEmpty(AttributeJson) ? null : JsonConvert.DeserializeObject<ICollection<AttributeType>>(AttributeJson);
        }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;

            if (!(obj is LibraryTypeComponent))
                return false;

            var b = (LibraryTypeComponent)obj;

            return Id.Equals(b.Id);

        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
