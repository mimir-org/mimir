using System;
using Mb.Data.Contracts;
using Mb.Models.Configurations;
using Microsoft.Extensions.Options;

namespace Mb.Data.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;
        
        public CommonRepository(IOptions<ModelBuilderConfiguration> modelBuilderConfiguration)
        {
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
        }

        public string CreateUniqueId()
        {
            return $"{_modelBuilderConfiguration.Domain}_{Guid.NewGuid()}";
        }

        public string GetDomain()
        {
            return _modelBuilderConfiguration.Domain;
        }

        public bool HasValidId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return false;

            var isValid = Guid.TryParse(id, out _);
            if (isValid)
                return false;

            var checkId = id.Split('_', StringSplitOptions.RemoveEmptyEntries);

            return checkId.Length == 2 && Guid.TryParse(checkId[1], out _);
        }

        public string CreateOrUseId(string id)
        {
            return HasValidId(id) ? id : CreateUniqueId();
        }
    }
}
