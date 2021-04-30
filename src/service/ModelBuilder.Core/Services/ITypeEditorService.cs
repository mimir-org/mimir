using System.Collections.Generic;
using Mb.Models.Data.TypeEditor;

namespace Mb.Core.Services
{
    public interface ITypeEditorService
    {
        Dictionary<int, string> GetAspects();
        IEnumerable<RdsAm> GetRds();
    }
}
