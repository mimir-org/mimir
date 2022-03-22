using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Mb.Data.Contracts
{
    public interface ISimpleRepository : IGenericRepository<ModelBuilderDbContext, Simple>
    {
        void AttachWithAttributes(ICollection<Simple> entities, EntityState state);

        /// <summary>
        /// Bulk update simples
        /// </summary>
        /// <param name="simples">The simples that should be updated</param>
        /// <returns>A bulk update task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkUpdate(List<Simple> simples);

        /// <summary>
        /// Bulk create simples
        /// </summary>
        /// <param name="simples">The simples that should be created</param>
        /// <returns>A bulk create task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkCreate(List<Simple> simples);

        /// <summary>
        /// Bulk delete simples
        /// </summary>
        /// <param name="simples">The simples that should be deleted</param>
        /// <returns>A bulk delete task</returns>
        /// <exception cref="ModelBuilderConfigurationException">Throws if database configuration is missing</exception>
        Task BulkDelete(List<Simple> simples);
    }
}