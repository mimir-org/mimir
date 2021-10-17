using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;
using Mb.TypeEditor.Data.Contracts;
using Mb.TypeEditor.Services.Contracts;
using Microsoft.AspNetCore.Http;

namespace Mb.TypeEditor.Services.Services
{
    public class LibraryTypeFileService : ILibraryTypeFileService
    {
        private readonly ILibraryTypeRepository _libraryTypeRepository;
        private readonly ILibraryTypeService _libraryTypeService;

        public LibraryTypeFileService(ILibraryTypeRepository libraryTypeRepository, ILibraryTypeService libraryTypeService)
        {
            _libraryTypeRepository = libraryTypeRepository;
            _libraryTypeService = libraryTypeService;
        }

        /// <summary>
        ///  Load types from file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task LoadDataFromFile(IFormFile file, CancellationToken cancellationToken)
        {
            await using var stream = new MemoryStream();
            await file.CopyToAsync(stream, cancellationToken);
            var types = stream.ToArray().Deserialize<List<LibraryType>>();
            await CreateLibraryTypeComponentsAsync(types);
        }

        /// <summary>
        /// Create a file from all types
        /// </summary>
        /// <returns></returns>
        public byte[] CreateFile()
        {
            var types = _libraryTypeService.GetAllTypes().ToList();
            return types.Serialize();
        }

        #region Private methods

        private async Task CreateLibraryTypeComponentsAsync(IEnumerable<LibraryType> libraryTypes)
        {
            var existingTypes = _libraryTypeRepository.GetAll().ToList();
            var notExistingTypes = libraryTypes.Where(x => existingTypes.All(y => y.Id != x.Id)).ToList();
            if (!notExistingTypes.Any())
                return;

            foreach (var item in notExistingTypes)
            {
                //item.CreateJsonData(); // TODO: Fix this
                await _libraryTypeRepository.CreateAsync(item);
            }

            await _libraryTypeRepository.SaveAsync();
        }

        #endregion
    }
}
