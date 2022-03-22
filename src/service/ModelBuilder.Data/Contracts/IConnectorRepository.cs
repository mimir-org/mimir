using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface IConnectorRepository : IGenericRepository<ModelBuilderDbContext, Connector>
    {
        void AttachWithAttributes(ICollection<Connector> entities, EntityState state);

        /// <summary>
        /// Relation bulk update
        /// </summary>
        /// <param name="relations">The relations to update</param>
        /// <returns>Update Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkUpdate(List<Relation> relations);

        /// <summary>
        /// Relation bulk create
        /// </summary>
        /// <param name="relations">The relations to create</param>
        /// <returns>Create Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkCreate(List<Relation> relations);

        /// <summary>
        /// Relation bulk delete
        /// </summary>
        /// <param name="relations">The relations to delete</param>
        /// <returns>Delete Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkDelete(List<Relation> relations);

        /// <summary>
        /// Terminal bulk update
        /// </summary>
        /// <param name="terminals">The terminals to update</param>
        /// <returns>Update Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkUpdate(List<Terminal> terminals);

        /// <summary>
        /// Terminal bulk create
        /// </summary>
        /// <param name="terminals">The terminals to create</param>
        /// <returns>Create Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkCreate(List<Terminal> terminals);

        /// <summary>
        /// Terminal bulk delete
        /// </summary>
        /// <param name="terminals">The terminals to delete</param>
        /// <returns>Delete Task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if missing database configuration</exception>
        Task BulkDelete(List<Terminal> terminals);
    }
}