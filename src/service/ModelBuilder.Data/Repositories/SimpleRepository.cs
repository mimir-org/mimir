using System.Collections.Generic;
using Mb.Data.Contracts;
using Mb.Models.Abstract;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
    }
}