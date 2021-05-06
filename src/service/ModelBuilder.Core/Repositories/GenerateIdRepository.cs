using System;
using Mb.Core.Configurations;
using Mb.Core.Repositories.Contracts;
using Microsoft.Extensions.Options;

namespace Mb.Core.Repositories
{
    public class GenerateIdRepository : IGenerateIdRepository
    {
        private readonly ModelBuilderConfiguration _modelBuilderConfiguration;

        public GenerateIdRepository(IOptions<ModelBuilderConfiguration> modelBuilderConfiguration)
        {
            _modelBuilderConfiguration = modelBuilderConfiguration?.Value;
        }

        public string CreateUniqueId(string version, string prefix = null)
        {
            return string.IsNullOrEmpty(prefix)
                ? $"{_modelBuilderConfiguration.Domain}/{version}/{Guid.NewGuid()}"
                : $"{_modelBuilderConfiguration.Domain}/{prefix}/{version}/{Guid.NewGuid()}";
        }
    }
}
