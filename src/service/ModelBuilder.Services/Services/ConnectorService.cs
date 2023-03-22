using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Mb.Models.Const;

namespace Mb.Services.Services;

public class ConnectorService : IConnectorService
{
    private readonly IMapper _mapper;
    private readonly IConnectorRepository _connectorRepository;
    private readonly ICommonRepository _commonRepository;


    public ConnectorService(IMapper mapper, IConnectorRepository connectorRepository, ICommonRepository commonRepository)
    {
        _mapper = mapper;
        _connectorRepository = connectorRepository;
        _commonRepository = commonRepository;
    }

    /// <summary>
    /// Get an aspect object by Id. The aspect object will include all connectors and attributes.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The aspect object</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the aspect object does not exist</exception>
    public Task<ConnectorCm> Get(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        var connectorId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetServerUrl(ServerEndpoint.Connector) + $"/{id}" : id;

        var connector = _connectorRepository.FindBy(x => x.Id == connectorId).FirstOrDefault();

        if (connector == null)
            throw new MimirorgNotFoundException($"Could not find connector with id: {id}");

        return Task.FromResult(_mapper.Map<ConnectorCm>(connector));
    }
}