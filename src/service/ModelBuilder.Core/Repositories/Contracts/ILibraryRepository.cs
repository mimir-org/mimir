using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface ILibraryRepository
    {
        IEnumerable<LibraryNodeItem> GetAll(string searchString);
    }
}
