using System;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Common;
using Mimirorg.Common.Exceptions;
using Mb.Models.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Mimirorg.Common.Extensions;

namespace Mb.Data.Repositories;

public class CommonRepository : ICommonRepository
{
    #region Private members

    private readonly ICompanyRepository _companyRepository;
    private readonly ApplicationSetting _applicationSetting;
    private readonly IHttpContextAccessor _contextAccessor;

    #endregion

    #region Constructors

    /// <summary>
    /// Repository for common data and application settings.
    /// There must be registered minimum one local Collaboration Partner
    /// </summary>
    /// <param name="companyRepository"></param>
    /// <param name="applicationSetting"></param>
    /// <param name="contextAccessor"></param>
    public CommonRepository(ICompanyRepository companyRepository, IOptions<ApplicationSetting> applicationSetting, IHttpContextAccessor contextAccessor)
    {
        _companyRepository = companyRepository;
        _contextAccessor = contextAccessor;
        _applicationSetting = applicationSetting?.Value;
    }

    #endregion

    #region Public methods

    /// <summary>
    /// Get current domain
    /// </summary>
    /// <returns>A new created id</returns>
    public Guid CreateId()
    {
        var validate = _applicationSetting.ValidateObject();
        if (!validate.IsValid)
            throw new MimirorgConfigurationException("There are missing configuration for application settings");

        var company = _companyRepository.GetCurrentCompany().Result;

        if (company == null)
            throw new MimirorgConfigurationException("The settings for company is not correct or missing registration in Tyle");

        return Guid.NewGuid();
    }

    /// <summary>
    /// Creates an Id as an Iri
    /// </summary>
    /// <param name="endpoint"></param>
    /// <param name="guid"></param>
    /// <returns>A valid Id as an Iri Id</returns>
    /// <exception cref="MimirorgBadRequestException"></exception>
    public string CreateIdAsIri(string endpoint, Guid guid)
    {
        if (string.IsNullOrWhiteSpace(endpoint) || guid == Guid.Empty)
            throw new MimirorgBadRequestException("Can't create new Id when 'endpoint' is NULL or 'guid' is not valid");

        return _contextAccessor.GetBaseUrl() + $"{endpoint}/{guid}";
    }

    /// <summary>
    /// Get the URL for the server
    /// </summary>
    /// <returns></returns>
    public string GetEndpoint(string endpoint)
    {
        return _contextAccessor.GetBaseUrl() + $"{endpoint}";
    }

        /// <summary>
    /// Get current domain
    /// </summary>
    /// <returns>Registered domain</returns>
    public string GetDomain()
    {
        var validate = _applicationSetting.ValidateObject();
        if (!validate.IsValid)
            throw new MimirorgConfigurationException("There are missing configuration for application settings");

        var company = _companyRepository.GetCurrentCompany().Result;

        return company.Domain;
    }

    /// <summary>
    /// Check if item has a valid id
    /// </summary>
    /// <param name="id">Id to validate</param>
    /// <returns>True if the id is valid</returns>
    /// <remarks>
    /// For an id to be valid, it should be of this format: {domain unique}_{item unique}
    /// </remarks>
    public bool HasValidId(Guid id)
    {
        if (id == Guid.Empty)
            return false;


        return true;
        //var checkId = id.Split('_', StringSplitOptions.RemoveEmptyEntries);
        //return checkId.Length == 2;
    }

    /// <summary>
    /// Check if Iri is valid
    /// </summary>
    /// <param name="iri">string</param>
    /// <returns>bool</returns>
    /// <remarks>
    /// For an iri to be valid, it should be of this format: http(s)://xxx.yyy
    /// </remarks> 
    public bool HasValidIri(string iri)
    {
        if (!Uri.IsWellFormedUriString(iri, UriKind.Absolute))
            return false;

        if (!Uri.TryCreate(iri, UriKind.Absolute, out var tmp))
            return false;

        return tmp.Scheme == Uri.UriSchemeHttp || tmp.Scheme == Uri.UriSchemeHttps;
    }

    /// <summary>
    /// Create an id if the id is not valid
    /// </summary>
    /// <param name="id">The id to check for validity</param>
    /// <param name="iri">The iri to create an id from</param>
    /// <returns>A valid id and iri</returns>
    public (Guid id, string iri) CreateOrUseIdAndIri(Guid id, string iri)
    {
        var hasValidId = HasValidId(id);
        var hasValidIri = !string.IsNullOrEmpty(iri);

        if (hasValidId && hasValidIri)
            return (id, iri);

        if (hasValidId)
            return (id, ResolveIri(id));

        //if (hasValidIri)
        //    return (ResolveId(iri), iri);

        var newId = CreateId();

        return (newId, ResolveIri(newId));
    }

    /// <summary>
    /// Create an id if the id is not valid
    /// </summary>
    /// <param name="replacement"></param>
    /// <returns>A valid id and iri</returns>
    public ReplacementId CreateOrUseIdAndIri(ReplacementId replacement)
    {
        throw new NotImplementedException();
    }
    //    if (replacement == null)
    //        throw new NullReferenceException("Replacement can't be null in CreateOrUseIdAndIri");

    //    var data = new ReplacementId { FromId = replacement.FromId, FromIri = replacement.FromIri };
    //    var hasValidId = HasValidId(replacement.FromId);
    //    var hasValidIri = HasValidIri(replacement.FromIri);

    //    if (!hasValidId && !string.IsNullOrWhiteSpace(replacement.FromId) && hasValidIri)
    //    {
    //        var domain = GetDomain();
    //        if (replacement.FromIri.ToLower().Contains(domain.ToLower()))
    //        {
    //            data.ToId = CreateId();
    //            data.ToIri = ResolveIri(data.ToId);
    //            return data;
    //        }
    //    }

    //    if (hasValidId)
    //    {
    //        data.ToId = replacement.FromId;
    //        data.ToIri = ResolveIri(replacement.FromId);
    //        return data;
    //    }

    //    if (hasValidIri)
    //    {
    //        data.ToIri = data.FromIri;
    //        data.ToId = ResolveId(data.FromIri);
    //        return data;
    //    }

    //    data.ToId = CreateId();
    //    data.ToIri = ResolveIri(data.ToId);
    //    return data;
    //}

    #endregion

    #region Private members

    /// <summary>
    /// Resolve Id from Iri
    /// </summary>
    /// <param name="iri">The iri to resolve from</param>
    /// <returns>A valid id</returns>
    private string ResolveId(string iri)
    {
        var validate = _applicationSetting.ValidateObject();
        if (!validate.IsValid)
            throw new MimirorgConfigurationException("There are missing configuration for application settings");

        if (string.IsNullOrEmpty(iri))
            return null;

        var iriParsed = new Uri(iri);
        var iriHost = iriParsed.Host;

        var companies = _companyRepository.GetCompanies().Result?.ToList();

        if (companies == null || !companies.Any())
            return null;

        var company = companies.FirstOrDefault(c => iriHost.Contains(c.Domain, StringComparison.InvariantCultureIgnoreCase));

        if (company == null)
            return null;

        var idPart = string.IsNullOrEmpty(iriParsed.Fragment) ? iriParsed.Segments.Last() : iriParsed.Fragment[1..];

        if (string.IsNullOrEmpty(idPart))
            throw new InvalidOperationException("Can't resolve id-part from IRI. The IRI has wrong format");

        if (idPart.Length < 2)
            throw new InvalidOperationException("Can't resolve id-part from IRI. The IRI has wrong format");

        if (idPart.StartsWith("ID"))
            idPart = idPart.Remove(0, 2);

        return $"{company.Domain}_{idPart}";
    }

    /// <summary>
    /// Resolve Iri from Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>A valid id</returns>
    private string ResolveIri(Guid idAsGuid)
    {
        throw new NotImplementedException();

        //var id = idAsGuid.ToString();
        //var domain = id?.ResolveDomain();

        //if (string.IsNullOrWhiteSpace(domain))
        //    throw new MimirorgConfigurationException($"Missing domain from id {id}");


    }


    #endregion
}