using System.Collections.Generic;
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

        public IEnumerable<Rds> GetRds()
        {
            var data = _fileRepository.ReadFile<Rds>(RdsFileName);
            return _mapper.Map<IEnumerable<Rds>>(data);
        }
    }
}
