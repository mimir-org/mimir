using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface ITransportRepository : IGenericRepository<ModelBuilderDbContext, Transport>
    {
        void UpdateInsert(Transport transport, EntityState entityState);

        /// <summary>
        /// Bulk transport update
        /// </summary>
        /// <param name="transports">The transports to be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Transport> transports);

        /// <summary>
        /// Bulk transport create
        /// </summary>
        /// <param name="transports">The transports to be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Transport> transports);

        /// <summary>
        /// Bulk transport delete
        /// </summary>
        /// <param name="transports">The transports to be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Transport> transports);
    }
}