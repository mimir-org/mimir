using System.Collections.Generic;

namespace Mb.TypeEditor.Data.Contracts
{
    public interface IFileRepository
    {
        public IEnumerable<T> ReadFile<T>(string filename) where T : class, new();
        public IEnumerable<string> ReadJsonFileList();
        IEnumerable<T> ReadAllFiles<T>(IEnumerable<string> fileNames) where T : class, new();
    }
}
