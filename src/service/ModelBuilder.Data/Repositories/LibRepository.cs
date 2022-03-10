using System;
using System.Collections.Generic;
using System.Linq;
using Mb.Data.Contracts;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Extensions;
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
            var enumT = EnumType.Unit.GetEnumTypeFromEnum();
            var method = typeof(Queryable).GetMethod("OfType");
            var generic = method?.MakeGenericMethod(new Type[] { enumT });
            var result = (IEnumerable<Unit>) generic?.Invoke(null, new object[] { _enumBaseRepository.GetAll() });
            return result?.ToList();
        }

        public void Untrack()
        {
            _enumBaseRepository.Context.ChangeTracker.Clear();
        }
    }
}