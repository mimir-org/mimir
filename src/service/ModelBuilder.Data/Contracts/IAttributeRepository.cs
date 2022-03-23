using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;

namespace Mb.Data.Contracts
{
    public interface IAttributeRepository : IGenericRepository<ModelBuilderDbContext, Mb.Models.Data.Attribute>
    {
        /// <summary>
        /// Bulk update attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Attribute> attributes);

        /// <summary>
        /// Bulk create or insert attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Attribute> attributes);

        /// <summary>
        /// Bulk delete attributes
        /// </summary>
        /// <param name="attributes">The attributes that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Attribute> attributes);
    }
}