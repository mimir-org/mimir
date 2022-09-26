using System.Collections.Generic;
using System.Threading.Tasks;
using Mimirorg.TypeLibrary.Models.Application;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface ILibraryRepository
    {
        Task<List<QuantityDatumCm>> GetQuantityDatums();
        Task<List<PurposeLibCm>> GetPurposes();
        Task<List<UnitLibCm>> GetUnits();
        Task<List<AttributeLibCm>> GetAttributes();
        Task<List<SymbolLibCm>> GetSymbols();
        Task<List<SimpleLibCm>> GetSimpleTypes();
        Task<List<AttributePredefinedLibCm>> GetPredefinedAttributes();
        Task<List<NodeLibCm>> GetNodeTypes();
        Task<List<InterfaceLibCm>> GetInterfaceTypes();
        Task<List<TransportLibCm>> GetTransportTypes();
        Task<List<RdsLibCm>> GetRds();
        Task<List<TerminalLibCm>> GetTerminalTypes();
        Task<NodeLibCm> CreateNodeType(NodeLibAm node);
        Task<NodeLibCm> UpdateNodeType(string id, NodeLibAm node);
        Task<TransportLibCm> CreateTransportType(TransportLibAm transport);
        Task<TransportLibCm> UpdateTransportType(string id, TransportLibAm transport);
        Task<InterfaceLibCm> CreateInterfaceType(InterfaceLibAm inter);
        Task<InterfaceLibCm> UpdateInterfaceType(string id, InterfaceLibAm inter);
        Task<bool> DeleteNode(string id);
        Task<bool> DeleteTransport(string id);
        Task<bool> DeleteInterface(string id);
    }
}