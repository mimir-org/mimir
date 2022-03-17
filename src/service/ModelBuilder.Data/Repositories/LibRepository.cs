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

        public T GetObjectById<T>(string id) where T : EnumBase
        {
            return _enumBaseRepository.GetAll().OfType<T>().FirstOrDefault(x => x.Id == id);

        }

        public IEnumerable<T> GetObject<T>() where T : EnumBase
        {
            return _enumBaseRepository.GetAll().OfType<T>().ToList();
        }

        public void Untrack()
        {
            _enumBaseRepository.Context.ChangeTracker.Clear();
        }
    }
}
