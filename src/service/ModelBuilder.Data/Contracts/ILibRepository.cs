using System.Collections.Generic;
using Mb.Models.Data.Enums;

namespace Mb.Data.Contracts
{
    public interface ILibRepository
    {
        T GetObjectById<T>(string id) where T : EnumBase;
        IEnumerable<T> GetObject<T>() where T : EnumBase;
        void Untrack();
    }
}