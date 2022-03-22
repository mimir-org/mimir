using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;

namespace Mb.Data.Contracts
{
    public interface IEdgeRepository : IGenericRepository<ModelBuilderDbContext, Edge>
    {
        IEnumerable<(Edge edge, WorkerStatus status)> UpdateInsert(ICollection<Edge> original, Project project, string invokedByDomain);
        Task<IEnumerable<(Edge edge, WorkerStatus status)>> DeleteEdges(ICollection<Edge> delete, string projectId, string invokedByDomain);

        /// <summary>
        /// Bulk update edges
        /// </summary>
        /// <param name="edges">The edges that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Edge> edges);

        /// <summary>
        /// Bulk create or insert edges
        /// </summary>
        /// <param name="edges">The edges that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Edge> edges);

        /// <summary>
        /// Bulk delete edges
        /// </summary>
        /// <param name="edges">The edges that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Edge> edges);
    }
}