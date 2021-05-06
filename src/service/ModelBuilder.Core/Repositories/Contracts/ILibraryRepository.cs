using System.Collections.Generic;
using Mb.Models;

namespace Mb.Core.Repositories.Contracts
{
    public interface ILibraryRepository
    {
        IEnumerable<LibNode> GetAll(string searchString);
    }
}
