using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories;
using Mb.Models;
using Mb.Models.Enums;

namespace Mb.Core.Services
{
    public class TypeEditorService : ITypeEditorService
    {
        public const string RdsFileName = "RDS";
        public const string AttributeFileName = "Attribute";

        private readonly IMapper _mapper;
        private readonly IFileRepository _fileRepository;

        public TypeEditorService(IMapper mapper, IFileRepository fileRepository)
        {
            _mapper = mapper;
            _fileRepository = fileRepository;
        }

        public Dictionary<int, string> GetAspects()
        {
            return EnumExtensions.ToDictionary<Aspect>();
        }

        public Dictionary<int, string> GetObjectTypes()
        {
            return EnumExtensions.ToDictionary<ObjectType>();
        }

        public IEnumerable<Rds> GetRds()
        {
            return _fileRepository.ReadFile<Rds>(RdsFileName);
        }

        public IEnumerable<AttributeType> GetAttributeTypes()
        {
            return _fileRepository.ReadFile<AttributeType>(AttributeFileName);
        }
    }
}
