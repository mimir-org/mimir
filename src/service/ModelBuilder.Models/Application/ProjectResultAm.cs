using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Application
{
    public class ProjectResultAm
    {
        public Project Project { get; set; }
        public IDictionary<string, string> IdChanges { get; set; }

        public ProjectResultAm()
        {
            IdChanges = new Dictionary<string, string>();
        }
    }
}
