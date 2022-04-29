using System;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;
using Newtonsoft.Json;
// ReSharper disable NonReadonlyMemberInGetHashCode

namespace Mb.Models.Data
{
    [Serializable]
    public class Edge : IEquatable<Edge>
    {
        public string Id { get; set; }
        public string Iri { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Kind => nameof(Edge);
        public string FromConnectorId { get; set; }
        public string FromConnectorIri { get; set; }
        public Connector FromConnector { get; set; }
        public string ToConnectorId { get; set; }
        public string ToConnectorIri { get; set; }
        public Connector ToConnector { get; set; }
        public string FromNodeId { get; set; }
        public string FromNodeIri { get; set; }
        public Node FromNode { get; set; }
        public string ToNodeId { get; set; }
        public string ToNodeIri { get; set; }
        public Node ToNode { get; set; }
        public string TransportId { get; set; }
        public Transport Transport { get; set; }
        public string InterfaceId { get; set; }
        public Interface Interface { get; set; }
        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        [Required]
        public string MasterProjectId { get; set; }

        public string MasterProjectIri { get; set; }

        [Required]
        public virtual string ProjectId { get; set; }

        public virtual string ProjectIri { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }

        #region IEquatable

        public bool Equals(Edge other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id &&
                   Iri == other.Iri &&
                   FromConnectorId == other.FromConnectorId &&
                   FromConnectorIri == other.FromConnectorIri &&
                   ToConnectorId == other.ToConnectorId &&
                   ToConnectorIri == other.ToConnectorIri &&
                   FromNodeId == other.FromNodeId &&
                   FromNodeIri == other.FromNodeIri &&
                   ToNodeId == other.ToNodeId &&
                   ToNodeIri == other.ToNodeIri &&
                   TransportId == other.TransportId &&
                   InterfaceId == other.InterfaceId &&
                   MasterProjectId == other.MasterProjectId &&
                   MasterProjectIri == other.MasterProjectIri &&
                   ProjectId == other.ProjectId &&
                   ProjectIri == other.ProjectIri;
        }

        public override bool Equals(object obj)
        {
            if (obj is null) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((Edge) obj);
        }

        public override int GetHashCode()
        {
            var hashCode = new HashCode();
            hashCode.Add(Id);
            hashCode.Add(Iri);
            hashCode.Add(FromConnectorId);
            hashCode.Add(FromConnectorIri);
            hashCode.Add(ToConnectorId);
            hashCode.Add(ToConnectorIri);
            hashCode.Add(FromNodeId);
            hashCode.Add(FromNodeIri);
            hashCode.Add(ToNodeId);
            hashCode.Add(ToNodeIri);
            hashCode.Add(TransportId);
            hashCode.Add(InterfaceId);
            hashCode.Add(MasterProjectId);
            hashCode.Add(MasterProjectIri);
            hashCode.Add(ProjectId);
            hashCode.Add(ProjectIri);
            return hashCode.ToHashCode();
        }

        #endregion
    }
}