using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.TypeEditor.Core.Contracts
{
    public interface IAttributeTypeService
    {
        IEnumerable<AttributeType> GetAttributeTypes(Aspect aspect);
        Task<AttributeType> CreateAttributeType(CreateAttributeType createAttributeType);
        Task<ICollection<AttributeType>> CreateAttributeTypes(List<CreateAttributeType> attributeTypes);
        IEnumerable<PredefinedAttributeAm> GetPredefinedAttributes();
        Task<List<PredefinedAttribute>> CreatePredefinedAttributes(List<PredefinedAttribute> attributes);
    }
}
