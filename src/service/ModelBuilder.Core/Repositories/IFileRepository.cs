using System.Collections.Generic;

namespace Mb.Core.Repositories
{
    public interface IFileRepository
    {
        public IEnumerable<T> ReadFile<T>(string filename) where T : class, new();
    }
}
