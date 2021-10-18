using Mb.Models.Data.Enums;
using Mb.Models.Enums;

namespace Mb.Models.Data.TypeEditor
{
    public class LibraryType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public Aspect Aspect { get; set; }

        public string RdsId { get; set; }
        public Rds Rds { get; set; }
        public string PurposeId { get; set; }
        public Purpose Purpose { get; set; }
    }
}
