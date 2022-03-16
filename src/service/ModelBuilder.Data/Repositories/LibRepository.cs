using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Mb.Data.Contracts;
using Mb.Models.Data.Enums;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
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

        public AttributeFormat GetAttributeFormat(string formatId)
        {
            var result = _enumBaseRepository.FindBy(f => f.Id == formatId);
            var first = result.First();
            if (first == null)
                throw new ModelBuilderConfigurationException($"Could not find format id enum with id {formatId}");
            if (first is AttributeFormat af)
                return af;
            else
                throw new ModelBuilderConfigurationException($"The enum {first.Name} with id {formatId} did not have type AttributeFormat as expected");
            
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