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
    public class InterfaceRepository : GenericRepository<ModelBuilderDbContext, Interface>, IInterfaceRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;

        public InterfaceRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IConnectorRepository connectorRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
        }

        public void UpdateInsert(Interface inter, EntityState entityState)
        {
            if (inter?.InputTerminal == null)
                return;

            inter.InputTerminalId = inter.InputTerminal.Id;

            foreach (var attribute in inter.InputTerminal.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(inter.InputTerminal, entityState);

            if (inter.OutputTerminal?.Id == null)
                return;

            inter.OutputTerminalId = inter.OutputTerminal.Id;

            foreach (var attribute in inter.OutputTerminal.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(inter.OutputTerminal, entityState);

            if (inter.Attributes == null)
                return;

            foreach (var attribute in inter.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            Attach(inter, entityState);
        }

        /// <summary>
        /// Bulk interface update
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="interfaces">The interfaces to be upserted</param>
        public void BulkUpsert(BulkOperations bulk, SqlConnection conn, List<Interface> interfaces)
        {
            if (interfaces == null || !interfaces.Any())
                return;

            bulk.Setup<Interface>()
                .ForCollection(interfaces)
                .WithTable("Interface")
                .AddColumn(x => x.Id)
                .AddColumn(x => x.Iri)
                .AddColumn(x => x.Version)
                .AddColumn(x => x.Rds)
                .AddColumn(x => x.Name)
                .AddColumn(x => x.Label)
                .AddColumn(x => x.Description)
                .AddColumn(x => x.TypeReferenceString)
                .AddColumn(x => x.InputTerminalId)
                .AddColumn(x => x.OutputTerminalId)
                .AddColumn(x => x.UpdatedBy)
                .AddColumn(x => x.Updated)
                .AddColumn(x => x.Created)
                .AddColumn(x => x.CreatedBy)
                .AddColumn(x => x.LibraryTypeId)
                .BulkInsertOrUpdate()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }

        /// <summary>
        /// Bulk delete interfaces
        /// </summary>
        /// <param name="bulk">Bulk operations</param>
        /// <param name="conn">Sql Connection</param>
        /// <param name="interfaces">The interfaces to be deleted</param>
        public void BulkDelete(BulkOperations bulk, SqlConnection conn, List<Interface> interfaces)
        {
            if (interfaces == null || !interfaces.Any())
                return;

            bulk.Setup<Interface>()
                .ForCollection(interfaces)
                .WithTable("Interface")
                .AddColumn(x => x.Id)
                .BulkDelete()
                .MatchTargetOn(x => x.Id)
                .Commit(conn);
        }
    }
}