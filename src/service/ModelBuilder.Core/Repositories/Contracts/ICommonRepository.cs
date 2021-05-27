using System.Collections.Generic;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Core.Repositories.Contracts
{
    public interface ICommonRepository
    {
        string CreateUniqueId();
        IEnumerable<TerminalColor> GetTerminalColors();
        TerminalColor GetTerminalColor(Terminal terminal, TerminalCategory category, RelationType relationType, NodeType nodeType);
        TerminalCategory GetCategory(Terminal terminal);
    }
}
