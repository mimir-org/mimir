using System.Collections.Generic;
using System.Linq;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Mb.Core.Repositories
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
            foreach (var connector in entities.OfType<Terminal>())
            {
                _attributeRepository.Attach(connector.Attributes, state);
                Attach(connector, state);
            }

            foreach (var connector in entities.OfType<Relation>())
            {
                Attach(connector, state);
            }
        }
    }
}
