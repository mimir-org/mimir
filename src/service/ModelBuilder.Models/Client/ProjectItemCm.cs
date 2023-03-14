using System;
using Mimirorg.Common.Extensions;

namespace Mb.Models.Client
{
    public class ProjectItemCm
    {
        public string Id { get; set; }
        public string Domain => Id.ResolveDomain();
        public string Name { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
        public DateTime Updated { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
    }
}