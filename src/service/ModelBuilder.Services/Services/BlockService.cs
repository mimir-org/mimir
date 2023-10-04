using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Const;
using Mb.Services.Contracts;
using Mimirorg.Common.Exceptions;
using System.Threading.Tasks;
using System.Web;

namespace Mb.Services.Services;

public class BlockService : IBlockService
{
    private readonly IMapper _mapper;
    private readonly IBlockRepository _blockRepository;
    private readonly ICommonRepository _commonRepository;


    public BlockService(IMapper mapper, IBlockRepository blockRepository, ICommonRepository commonRepository)
    {
        _mapper = mapper;
        _blockRepository = blockRepository;
        _commonRepository = commonRepository;
    }

    /// <summary>
    /// Get a block by Id. The block will include all connectors and attributes.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The block</returns>
    /// <exception cref="MimirorgNotFoundException">Throws if the block does not exist</exception>
    public async Task<BlockCm> Get(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new MimirorgNotFoundException("Id can't be null og empty.");

        var urlDecodedId = HttpUtility.UrlDecode(id);

        var blockId = urlDecodedId.Length == GlobalSettings.GuidLength ? _commonRepository.GetEndpoint(ServerEndpoint.Block) + $"/{urlDecodedId}" : urlDecodedId;

        var block = await _blockRepository.GetAsyncComplete(blockId);

        if (block == null)
            throw new MimirorgNotFoundException($"Could not find block with id: {id}");

        return _mapper.Map<BlockCm>(block);
    }
}