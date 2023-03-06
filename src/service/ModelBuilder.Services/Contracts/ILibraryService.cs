using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Common;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Services.Contracts
{
    public interface ILibraryService
    {
        /// <summary>
        /// Get all node types
        /// </summary>
        /// <returns></returns>
        Task<List<NodeLibCm>> GetNodeTypes(string searchString);

        /// <summary>
        /// Get all terminalConnector types
        /// </summary>
        /// <returns>A collection of all registered terminals</returns>
        Task<List<TerminalLibCm>> GetTerminalTypes();

        /// <summary>
        /// Get all quantity datums
        /// </summary>
        /// <returns>A collection of quantity datums</returns>
        Task<List<QuantityDatumCm>> GetQuantityDatums();

        /// <summary>
        /// Get all attribute types
        /// </summary>
        /// <returns>A collection of attribute types</returns>
        Task<List<AttributeLibCm>> GetAttributeTypes();

        /// <summary>
        /// Get all sub projects
        /// </summary>
        /// <returns></returns>
        Task<List<LibrarySubProject>> GetSubProjects(string searchString = null);

        /// <summary>
        /// Send refresh cache to all connected clients
        /// </summary>
        /// <returns></returns>
        Task SendRefreshLibData();
    }
}