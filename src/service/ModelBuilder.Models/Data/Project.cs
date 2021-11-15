using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Mb.Models.Extensions;

namespace Mb.Models.Data
{
    [Serializable]
    public class Project
    {
        #region Properties

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

        [Required]
        public bool IsSubProject { get; set; }

        [Required]
        public string Version { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string ProjectOwner { get; set; }

        [Required]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        public virtual ICollection<Node> Nodes { get; set; }
        public virtual ICollection<Edge> Edges { get; set; }

        #endregion

        #region Public methods

        public void IncrementMajorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMajorVersion();
        }

        public void IncrementMinorVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementMinorVersion();
        }

        public void IncrementCommitVersion()
        {
            if (Version.Length == 3)
                Version += ".0";

            Version = Version.IncrementCommitVersion();
        }

        #endregion

        #region Private methods

        private void SetId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return;

            _id = id;
            if (string.IsNullOrEmpty(_domain))
                _domain = id.ResolveDomain();

            if (string.IsNullOrEmpty(_iri))
                _iri = id.ResolveIri();
        }

        private void SetIri(string iri)
        {
            if (string.IsNullOrEmpty(iri))
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

        #endregion

        #region Private members

        private string _id;
        private string _iri;
        private string _domain;

        #endregion
    }
}
