using System;
using System.Collections.Generic;
using Mb.Models.Data;

namespace Mb.Models.Common
{
    public class LibrarySubProjectItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public DateTime Updated { get; set; }
        public string UpdatedBy { get; set; }
        public ICollection<string> Versions { get; set; }
        public Project Project { get; set; }
    }
}