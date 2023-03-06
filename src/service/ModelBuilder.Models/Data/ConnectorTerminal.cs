using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using TypeScriptBuilder;

namespace Mb.Models.Data
{
    public class ConnectorTerminal : Connector, IEquatable<ConnectorTerminal>
    {
        public string Color { get; set; }
        public string TerminalType { get; set; }
        public string TerminalParentType { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
        public string Discriminator => nameof(ConnectorTerminal);

        [JsonIgnore]
        [TSExclude]
        public string TypeReferenceString { get; set; }

        [NotMapped]
        public ICollection<TypeReference> TypeReferences
        {
            get
            {
                if (_typeReferences != null)
                    return _typeReferences;

                return !string.IsNullOrWhiteSpace(TypeReferenceString) ? JsonConvert.DeserializeObject<ICollection<TypeReference>>(TypeReferenceString) : null;
            }

            set => _typeReferences = value;
        }

       
        public bool Equals(ConnectorTerminal other)
        {
            if (other is null) 
                return false;
            
            if (ReferenceEquals(this, other)) 
                return true;

            return base.Equals(other) &&
                   TypeReferenceString == other.TypeReferenceString &&
                   Color == other.Color &&
                   TerminalType == other.TerminalType &&
                   TerminalParentType == other.TerminalParentType;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) 
                return false;

            if (ReferenceEquals(this, obj)) 
                return true;

            return obj.GetType() == GetType() && Equals((ConnectorTerminal) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(base.GetHashCode(), Color, TerminalType, TypeReferenceString);
        }

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

    }
}