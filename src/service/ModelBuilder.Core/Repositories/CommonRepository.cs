using System;
using Mb.Core.Configurations;
using Mb.Core.Repositories.Contracts;
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
    }
}
