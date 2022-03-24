using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SqlBulkTools;

namespace Mb.Data.Repositories
{
    public class SimpleRepository : GenericRepository<ModelBuilderDbContext, Simple>, ISimpleRepository
    {
        private readonly IAttributeRepository _attributeRepository;

        public SimpleRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
        }

        public void AttachWithAttributes(ICollection<Simple> entities, EntityState state)
        {
            if (entities == null)
                return;

            foreach (var simple in entities)
            {
                if (simple.Attributes != null)
                {
                    foreach (var attribute in simple.Attributes)
                    {
                        attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(simple, state);
            }
        }

        /// <summary>
        /// Bulk simple update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="simples">The simples to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Simple> simples)
        {
            if (simples == null || !simples.Any())
                return;

            bulk.Setup<Simple>()
                .ForCollection(simples)
                .WithTable("Simple")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.NodeId)
                .AddColumn(x => x.NodeIri)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete simples
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="simples">The simples to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Simple> simples)
        {
            if (simples == null || !simples.Any())
                return;

            bulk.Setup<Simple>()
                .ForCollection(simples)
                .WithTable("Simple")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}