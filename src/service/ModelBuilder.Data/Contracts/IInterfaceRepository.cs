using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface IInterfaceRepository : IGenericRepository<ModelBuilderDbContext, Interface>
    {
        void UpdateInsert(Interface inter, EntityState entityState);

        /// <summary>
        /// Bulk update interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Interface> interfaces);

        /// <summary>
        /// Bulk create or insert interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Interface> interfaces);

        /// <summary>
        /// Bulk delete interfaces
        /// </summary>
        /// <param name="interfaces">The interfaces that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Interface> interfaces);
    }
}