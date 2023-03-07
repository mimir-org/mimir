using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Const;
using Newtonsoft.Json;
using TypeScriptBuilder;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class ConnectorTerminal : Connector, IEquatable<ConnectorTerminal>
    {
        public override string Color { get; set; }
        public override string TerminalType { get; set; }
        public override string TerminalParentType { get; set; }
        public override string Discriminator => Discriminators.Terminal;
        public ICollection<Attribute> Attributes { get; set; }
        
        [JsonIgnore]
        [TSExclude]
        public override string TypeReference { get; set; }

        [NotMapped]
        public ICollection<TypeReference> TypeReferences
        {
            get
            {
                if (_typeReferences != null)
                    return _typeReferences;

                return !string.IsNullOrWhiteSpace(TypeReference) ? JsonConvert.DeserializeObject<ICollection<TypeReference>>(TypeReference) : null;
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
                   TypeReference == other.TypeReference &&
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
            return HashCode.Combine(base.GetHashCode(), Color, TerminalType, TypeReference);
        }

        [TSExclude]
        private ICollection<TypeReference> _typeReferences;

    }
}