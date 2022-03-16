using System.Collections.Generic;
using Mb.Models.Data.Enums;

namespace Mb.Data.Contracts
{
    public interface ILibRepository
    {
        IEnumerable<Unit> GetUnits();
        AttributeFormat GetAttributeFormat(string formatId);
        void Untrack();
    }
}