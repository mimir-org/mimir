using System;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    public class ConnectionTerminal : Connection, IEquatable<ConnectionTerminal>
    {
        public string TerminalType { get; set; }
        public string TerminalParentType { get; set; }
        public string Color { get; set; }
        public string Discriminator => nameof(ConnectionTerminal);

        public bool Equals(ConnectionTerminal other)
        {
            if (other is null) 
                return false;
            
            if (ReferenceEquals(this, other)) 
                return true;

            return base.Equals(other) &&
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
            return HashCode.Combine(base.GetHashCode(), TerminalType);
        }
    }
}