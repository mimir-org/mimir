using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class TerminalType
    {
        public string Id { get; set; } 
        public Terminal Terminal { get; set; }
        public ConnectorType ConnectorType { get; set; }
        public string SemanticReference { get; set; }
        public string Color { get; set; }

        [JsonIgnore]
        public string AttributeJson { get; set; }

        public ICollection<AttributeType> Attributes { get; set; }

        public void CreateJsonData()
        {
            AttributeJson = Attributes != null && Attributes.Any() ? JsonConvert.SerializeObject(Attributes) : null;
        }

        public void CreateFromJsonData()
        {
            Attributes = string.IsNullOrEmpty(AttributeJson) ? null : JsonConvert.DeserializeObject<ICollection<AttributeType>>(AttributeJson);
        }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
                return false;

            if (!(obj is LibraryType))
                return false;

            var b = (LibraryType)obj;

            return Id.Equals(b.Id);

        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
