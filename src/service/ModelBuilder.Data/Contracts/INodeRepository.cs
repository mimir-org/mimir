using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;

namespace Mb.Data.Contracts
{
    public interface INodeRepository : IGenericRepository<ModelBuilderDbContext, Node>
    {
        IEnumerable<(Node node, WorkerStatus status)> UpdateInsert(ICollection<Node> original, Project project, string invokedByDomain);
        IEnumerable<(Node node, WorkerStatus status)> DeleteNodes(ICollection<Node> delete, string projectId, string invokedByDomain);

        /// <summary>
        /// Bulk node update
        /// </summary>
        /// <param name="nodes">The nodes to be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Node> nodes);

        /// <summary>
        /// Bulk node insert
        /// </summary>
        /// <param name="nodes">The nodes to be inserted</param>
        /// <returns>A bulk insert task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Node> nodes);

        /// <summary>
        /// Bulk node delete
        /// </summary>
        /// <param name="nodes">The nodes to be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Node> nodes);
    }
}