using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Data
{
    [Serializable]
    public class Edge
    {
        public string Id
        {
            get => _id;
            set => SetId(value);
        }

        public string Iri
        {
            get => _iri;
            set => SetIri(value);
        }

        public string Domain
        {
            get => _domain;
            set => SetDomain(value);
        }

        public string FromConnectorId { get; set; }
        public Connector FromConnector { get; set; }
        
        public string ToConnectorId { get; set; }
        public Connector ToConnector { get; set; }
        
        public string FromNodeId { get; set; }
        public Node FromNode { get; set; }
        
        public string ToNodeId { get; set; }
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

        public virtual ICollection<Project> Projects { get; set; }

        #region Private methods

        private void SetId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return;

            _id = id;
            if (string.IsNullOrEmpty(_domain))
                _domain = id.ResolveDomain();

            if (string.IsNullOrEmpty(_iri) || !_id.HasValidIri(_iri))
                _iri = id.ResolveIri();
        }

        private void SetIri(string iri)
        {
            if (string.IsNullOrEmpty(iri) || (!string.IsNullOrEmpty(_id) && !_id.HasValidIri(iri)))
                return;

            _iri = iri;
            if (string.IsNullOrEmpty(_id) && !string.IsNullOrEmpty(_domain))
                _id = iri.ResolveIdFromIriAndDomain(_domain);
        }

        private void SetDomain(string domain)
        {
            if (string.IsNullOrEmpty(domain))
                return;

            _domain = domain;
            if (string.IsNullOrEmpty(_id) && !string.IsNullOrEmpty(_iri))
                _id = _iri.ResolveIdFromIriAndDomain(domain);
        }

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
            if (string.IsNullOrEmpty(iri) || (!string.IsNullOrEmpty(_id) && !_id.HasValidIri(iri)))
                return;

            _masterProjectIri = iri;
            if (string.IsNullOrEmpty(_masterProjectId))
                _masterProjectId = _masterProjectIri.ResolveIdFromIriAndDomain(_domain);
        }

        #endregion

        #region Private members

        private string _id;
        private string _iri;
        private string _domain;
        private string _masterProjectId;
        private string _masterProjectIri;

        #endregion
    }
}
