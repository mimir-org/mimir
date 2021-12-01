using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    [Serializable]
    public class Node
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

        public string Rds { get; set; }

        public string Description { get; set; }

        public string SemanticReference { get; set; }

        [Required]
        public string Name { get; set; }

        public string Label { get; set; }

        [Required]
        public decimal PositionX { get; set; }

        [Required]
        public decimal PositionY { get; set; }

        public bool IsLocked { get; set; }
        public string IsLockedStatusBy { get; set; }
        public DateTime? IsLockedStatusDate { get; set; }

        [Required]
        public decimal PositionBlockX { get; set; }

        [Required]
        public decimal PositionBlockY { get; set; }

        [Required]
        public int Level { get; set; }

        [Required]
        public int Order { get; set; }

        [Required]
        public string StatusId { get; set; }

        public BuildStatus Status { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime Updated { get; set; }

        public DateTime? Created { get; set; }

        public string CreatedBy { get; set; }

        public string LibraryTypeId { get; set; }

        public string Version { get; set; }

        public Aspect Aspect { get; set; }

        [Required]
        public bool IsRoot { get; set; }

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

        public string Symbol { get; set; }

        public string PurposeString { get; set; }

        [NotMapped]
        public virtual Purpose Purpose { get; set; }

        public virtual ICollection<Connector> Connectors { get; set; }

        public virtual ICollection<Attribute> Attributes { get; set; }

        public virtual ICollection<Composite> Composites { get; set; }

        [Required]
        public virtual string ProjectId { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> FromEdges { get; set; }

        [JsonIgnore]
        public virtual ICollection<Edge> ToEdges { get; set; }

        // Required Only for location aspect
        public decimal? Length { get; set; }

        public decimal? Width { get; set; }

        public decimal? Height { get; set; }

        public decimal? Area => Length * Width;

        // Required only for product aspect
        public decimal? Cost { get; set; }

        public void IncrementMinorVersion()
        {
            Version = Version.IncrementMinorVersion();
        }

        public void IncrementMajorVersion()
        {
            Version = Version.IncrementMajorVersion();
        }

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
