using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Core.Repositories.Contracts
{
    public interface ICommonRepository
    {
        string CreateUniqueId();
        string GetDomain();
        IEnumerable<TerminalColor> GetTerminalColors();
        //TerminalColor GetTerminalColor(Terminal terminal, TerminalCategory category, RelationType relationType, NodeType nodeType); // TODO: Fix this
        //TerminalCategory GetCategory(Terminal terminal); // TODO: Fix this
    }
}
