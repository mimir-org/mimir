using System;

namespace Mb.Models.Data
{
    public class ProjectSimpleAm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProjectOwner { get; set; }
        public DateTime? LastEdited { get; set; }
    }
}
