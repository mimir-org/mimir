using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Core.Services
{
    public interface ITypeEditorService
    {
        IEnumerable<RdsAm> GetRds();
    }
}
