using System.Collections.Generic;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Mb.Core.Repositories
{
    public class CompositeRepository : GenericRepository<ModelBuilderDbContext, Composite>, ICompositeRepository
    {
        private readonly IAttributeRepository _attributeRepository;

        public CompositeRepository(ModelBuilderDbContext dbContext, IAttributeRepository attributeRepository) : base(dbContext)
        {
            _attributeRepository = attributeRepository;
        }

        public void AttachWithAttributes(ICollection<Composite> entities, EntityState state)
        {
            if(entities == null)
                return;

            foreach (var composite in entities)
            {
                if (composite.Attributes != null)
                {
                    foreach (var attribute in composite.Attributes)
                    {
                        attribute.UnitString = attribute.Units != null ? JsonConvert.SerializeObject(attribute.Units) : null;
                        _attributeRepository.Attach(attribute, state);
                    }
                }
                Attach(composite, state);
            }
        }
    }
}
