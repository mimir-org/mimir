using System.Collections.Generic;
using Mb.Models.Data.Enums;

namespace Mb.Data.Contracts
{
    public interface ILibRepository
    {
        IEnumerable<Unit> GetUnits();
        T GetEnumById<T>(string id) where T : EnumBase;
        void Untrack();
    }
}