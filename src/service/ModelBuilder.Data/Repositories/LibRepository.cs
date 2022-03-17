using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Data.Enums;
using Mb.TypeEditor.Data.Contracts;

namespace Mb.Data.Repositories
{
    public class LibRepository : ILibRepository
    {
        private readonly IEnumBaseRepository _enumBaseRepository;

        public LibRepository(IEnumBaseRepository enumBaseRepository)
        {
            _enumBaseRepository = enumBaseRepository;
        }

        public IEnumerable<Unit> GetUnits()
        {
            return _enumBaseRepository.GetAll().OfType<Unit>().ToList();
        }

        public IEnumerable<AttributeFormat> GetAttributeFormats()
        {
            return _enumBaseRepository.GetAll().OfType<AttributeFormat>().ToList();
        }

        public void Untrack()
        {
            _enumBaseRepository.Context.ChangeTracker.Clear();
        }
    }
}
