using System.Collections.Generic;

namespace Mb.Models.Data.TypeEditor
{
    public class CreateLibraryComponentAm
    {
        public string Id { get; set; }
        public AspectAm Aspect { get; set; }
        // Object type
        public string TypeName { get; set; }
        public StatusAm Status { get; set; }
        public RdsAm Rds { get; set; }
        // Terminals
        // Attributes

    }
}
