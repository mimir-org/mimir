using Mb.Core.Repositories.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Repositories
{
    public class TransportRepository : GenericRepository<ModelBuilderDbContext, Transport>, ITransportRepository
    {
        private readonly IAttributeRepository _attributeRepository;
        private readonly IConnectorRepository _connectorRepository;

        public TransportRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository, IConnectorRepository connectorRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
            _connectorRepository = connectorRepository;
        }

        public void UpdateInsert(Transport transport, EntityState entityState)
        {
            if (transport?.InputTerminal == null)
                return;

            transport.InputTerminalId = transport.InputTerminal.Id;

            foreach (var attribute in transport.InputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;
            
                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(transport.InputTerminal, entityState);

            if (transport.OutputTerminal?.Id == null)
                return;

            transport.OutputTerminalId = transport.OutputTerminal.Id;

            foreach (var attribute in transport.OutputTerminal?.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            _connectorRepository.Attach(transport.OutputTerminal, entityState);

            if (transport.Attributes == null)
                return;

            foreach (var attribute in transport.Attributes)
            {
                attribute.UnitString = attribute.Units != null
                    ? JsonConvert.SerializeObject(attribute.Units)
                    : null;

                _attributeRepository.Attach(attribute, entityState);
            }

            Attach(transport, entityState);
        }
    }
}