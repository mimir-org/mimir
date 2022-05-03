using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Data.TypeEditor;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Data.Contracts
{
    public interface ILibraryRepository
    {
        Task<List<AttributeQualifierLibCm>> GetAttributeQualifiers();
        Task<List<AttributeSourceLibCm>> GetAttributeSources();
        Task<List<AttributeFormatLibCm>> GetAttributeFormats();
        Task<List<AttributeConditionLibCm>> GetAttributeConditions();
        Task<List<PurposeLibCm>> GetPurposes();
        Task<List<AttributeAspectLibCm>> GetAspectAttributes();
        Task<List<UnitLibCm>> GetUnits();
        Task<List<AttributeLibCm>> GetAttributes();
        Task<List<BlobLibCm>> GetBlobData();
        Task<List<SimpleLibCm>> GetSimpleTypes();
        Task<List<AttributePredefinedLibCm>> GetPredefinedAttributes();

        Task<List<NodeLibCm>> GetNodeTypes();
        Task<List<InterfaceLibCm>> GetInterfaceTypes();
        Task<List<TransportLibCm>> GetTransportTypes();
        Task<List<Rds>> GetRds();
    }
}