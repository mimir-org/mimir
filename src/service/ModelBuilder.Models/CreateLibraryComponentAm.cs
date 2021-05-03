using Mb.Models.Enums;

namespace Mb.Models
{
    public class CreateLibraryComponentAm
    {
        public string Id { get; set; }
        public Aspect Aspect { get; set; }
        // Object type
        public string TypeName { get; set; }
        public Status Status { get; set; }
        public Rds Rds { get; set; }
        // Terminals
        // Attributes

    }
}
