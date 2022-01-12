using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

            foreach (var attribute in inter.InputTerminal?.Attributes)
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

            foreach (var attribute in inter.OutputTerminal?.Attributes)
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
    }
}