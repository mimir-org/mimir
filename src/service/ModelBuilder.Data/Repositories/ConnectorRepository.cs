using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Mb.Data.Repositories
{
    public class ConnectorRepository : GenericRepository<ModelBuilderDbContext, Connector>, IConnectorRepository
    {
        private readonly IAttributeRepository _attributeRepository;

        public ConnectorRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
        }

        public void AttachWithAttributes(ICollection<Connector> entities, EntityState state)
        {
            if(entities == null)
                return;

            foreach (var connector in entities.OfType<Terminal>())
            {
                if (connector.Attributes != null)
                {
                    foreach (var attribute in connector.Attributes)
                    {
                        attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(connector, state);
            }

            foreach (var connector in entities.OfType<Relation>())
            {
                Attach(connector, state);
            }
        }
    }
}
