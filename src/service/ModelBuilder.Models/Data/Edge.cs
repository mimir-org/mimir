using System;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Edge
    {
        public string Id { get; set; }
        public string Iri { get; set; }

        public string Domain => Id.ResolveDomain();

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
        public string MasterProjectId
        {
            get => _masterProjectId;
            set => SetMasterProjectId(value);
        }

        public string MasterProjectIri
        {
            get => _masterProjectIri;
            set => SetMasterProjectIri(value);
        }

        [Required]
        public virtual string ProjectId { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }
        
        #region Private methods

        private void SetMasterProjectId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return;

            _masterProjectId = id;
            if (string.IsNullOrEmpty(_masterProjectIri))
                _masterProjectIri = _masterProjectId.ResolveIri();
        }

        private void SetMasterProjectIri(string iri)
        {
            if (string.IsNullOrEmpty(iri) || (!string.IsNullOrEmpty(Id) && !Id.HasValidIri(iri)))
                return;

            _masterProjectIri = iri;
            if (string.IsNullOrEmpty(_masterProjectId))
                _masterProjectId = _masterProjectIri.ResolveIdFromIriAndDomain(Domain);
        }

        #endregion

        #region Private members

        private string _masterProjectId;
        private string _masterProjectIri;

        #endregion
    }
}
