﻿using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Data;
using Mb.Models.Exceptions;

namespace Mb.Data.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        #region Private members

        private readonly ICollaborationPartnerRepository _collaborationPartnerRepository;
        private ICollection<CollaborationPartner> _collaborationPartners;
        private CollaborationPartner _currentCollaborationPartner;

        #endregion

        #region Constructors

        /// <summary>
        /// Repository for common data and application settings.
        /// There must be registered minimum one local Collaboration Partner
        /// </summary>
        /// <param name="collaborationPartnerRepository"></param>
        public CommonRepository(ICollaborationPartnerRepository collaborationPartnerRepository)
        {
            _collaborationPartnerRepository = collaborationPartnerRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Get current domain
        /// </summary>
        /// <returns>A new created id</returns>
        public string CreateId()
        {
            Init();
            if (_currentCollaborationPartner == null)
                throw new ModelBuilderNullReferenceException("There are missing application setting for current collaboration partner");

            return $"{_currentCollaborationPartner.Domain}_{Guid.NewGuid().ToString().ToLower()}";
        }

        /// <summary>
        /// Get current domain
        /// </summary>
        /// <returns>Registered domain</returns>
        public string GetDomain()
        {
            Init();
            if(_currentCollaborationPartner == null)
                throw new ModelBuilderNullReferenceException("There are missing application setting for current collaboration partner");

            return _currentCollaborationPartner.Domain;
        }

        /// <summary>
        /// Check if item has a valid id
        /// </summary>
        /// <param name="id">Id to validate</param>
        /// <returns>True if the id is valid</returns>
        /// <remarks>
        /// For an id to be valid, it should be of this format: {domain unique}_{item unique}
        /// </remarks>
        public bool HasValidId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return false;

            var checkId = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
            return checkId.Length == 2;
        }

        /// <summary>
        /// Create an id if the id is not valid
        /// </summary>
        /// <param name="id">The id to check for validity</param>
        /// <param name="iri">The iri to create an id from</param>
        /// <returns>A valid id and iri</returns>
        public (string id, string iri) CreateOrUseIdAndIri(string id, string iri)
        {
            var hasValidId = HasValidId(id);
            var hasValidIri = !string.IsNullOrEmpty(iri);

            if (hasValidId && hasValidIri)
                return (id, iri);

            if (hasValidId)
                return (id, ResolveIri(id));

            if (hasValidIri)
                return (ResolveId(iri), iri);

            var newId = CreateId();
            return (newId, ResolveIri(newId));
        }

        #endregion

        #region Private members

        /// <summary>
        /// Initial data import
        /// </summary>
        private void Init()
        {
            if(_collaborationPartners != null && _collaborationPartners.Any() && _currentCollaborationPartner != null)
                return;

            _collaborationPartners = _collaborationPartnerRepository?.GetAll()?.ToList();
            _currentCollaborationPartner = _collaborationPartners?.FirstOrDefault(x => x.Current);
        }

        /// <summary>
        /// Resolve Id from Iri
        /// </summary>
        /// <param name="iri">The iri to resolve from</param>
        /// <returns>A valid id</returns>
        private string ResolveId(string iri)
        {
            Init();

            if (string.IsNullOrEmpty(iri))
                return null;

            var iriParsed = new Uri(iri);
            var iriHost = iriParsed.Host;

            var collaborationPartner = _collaborationPartners.FirstOrDefault(c => c.Iris.Any(i => i.Equals(iriHost, StringComparison.InvariantCultureIgnoreCase)));

            if (collaborationPartner == null)
                return null;

            var idPart = string.IsNullOrEmpty(iriParsed.Fragment) ?
                iriParsed.Segments.Last() :
                iriParsed.Fragment[1..];

            return $"{collaborationPartner.Domain}_{idPart}";
        }

        /// <summary>
        /// Resolve Iri from Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A valid id</returns>
        private string ResolveIri(string id)
        {
            Init();

            if (_currentCollaborationPartner == null || !_currentCollaborationPartner.Iris.Any())
                throw new ModelBuilderNullReferenceException("There are missing application setting for current collaboration partner");

            var iri = _currentCollaborationPartner.Iris?.FirstOrDefault();
            if(iri == null)
                throw new ModelBuilderNullReferenceException("There are missing application setting for current collaboration partner default iri");

            if (iri.StartsWith("http"))
                return $"{iri.TrimEnd('/')}/ID{SplitId(id)}";

            return $"http://{iri.TrimEnd('/')}/ID{SplitId(id)}";
        }

        /// <summary>
        /// Split id and return last segment
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private string SplitId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return id;

            var split = id.Split(@"_", StringSplitOptions.RemoveEmptyEntries);
            if (split.Length <= 1)
                return id;

            var lastSegment = split[^1];
            return string.IsNullOrEmpty(lastSegment) ? id : lastSegment.Replace("ID","").Trim();
        }

        #endregion
    }
}
