using System;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Configurations;
using Microsoft.Extensions.Options;

namespace Mb.Core.Repositories
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

        public string CreateOrUseId(string id)
        {
            if (string.IsNullOrEmpty(id))
                return CreateUniqueId();

            var isValid = Guid.TryParse(id, out _);
            if (isValid)
                return CreateUniqueId();

            var checkId = id.Split('_', StringSplitOptions.RemoveEmptyEntries);

            if (checkId.Length != 2)
                return CreateUniqueId();

            return !Guid.TryParse(checkId[1], out _) ?
                CreateUniqueId() :
                id;
        }
    }
}
