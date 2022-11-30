using System.Collections.Generic;
using System.Threading.Tasks;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface ILibraryRepository
    {
        Task<List<QuantityDatumCm>> GetQuantityDatums();
        Task<List<UnitLibCm>> GetUnits();
        Task<List<NodeLibCm>> GetNodeTypes();
        Task<List<InterfaceLibCm>> GetInterfaceTypes();
        Task<List<TransportLibCm>> GetTransportTypes();
        Task<List<TerminalLibCm>> GetTerminalTypes();
        Task<List<AttributeLibCm>> GetAttributeTypes();

    }
}