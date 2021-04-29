using System.Collections.Generic;
using AutoMapper;
using Mb.Core.Models;
using Mb.Core.Repositories;
using Mb.Models.Data;

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

        public IEnumerable<RdsAm> GetRds()
        {
            var data = _fileRepository.ReadFile<Rds>(RdsFileName);
            return _mapper.Map<IEnumerable<RdsAm>>(data);
        }
    }
}
