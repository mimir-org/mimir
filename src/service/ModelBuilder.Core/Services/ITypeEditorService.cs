using System.Collections.Generic;
using Mb.Models;

namespace Mb.Core.Services
{
    public interface ITypeEditorService
    {
        Dictionary<int, string> GetAspects();
        IEnumerable<Rds> GetRds();
    }
}
