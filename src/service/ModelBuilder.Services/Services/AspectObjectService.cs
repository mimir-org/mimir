using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mimirorg.Common.Exceptions;
using Mb.Services.Contracts;
using Mb.Models.Const;

namespace Mb.Services.Services;

public class AspectObjectService : IAspectObjectService
{
    private readonly IMapper _mapper;
    private readonly IAspectObjectRepository _aspectObjectRepository;
    private readonly ICommonRepository _commonRepository;


    public AspectObjectService(IMapper mapper, IAspectObjectRepository aspectObjectRepository, ICommonRepository commonRepository)
    {
        _mapper = mapper;
        _aspectObjectRepository = aspectObjectRepository;
        _commonRepository = commonRepository;
    }

    /// <summary>
    /// Get an aspect object by Id. The aspect object will include all connectors and attributes.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The aspect object</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the aspect object does not exist</exception>
    public async Task<AspectObjectCm> Get(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        var aspectObjectId = id.Length == GlobalSettings.GuidLength ? _commonRepository.GetEndpoint(ServerEndpoint.AspectObject) + $"/{id}" : id;

        var aspectObject = await _aspectObjectRepository.GetAsyncComplete(aspectObjectId);

        if (aspectObject == null)
            throw new MimirorgNotFoundException($"Could not find aspect object with id: {id}");

        return _mapper.Map<AspectObjectCm>(aspectObject);
    }
}