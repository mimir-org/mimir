using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class Rds
    {
        public int Id { get; set; }
        public RdsCategory Category { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string SemanticReference { get; set; }
        public bool IsFunction { get; set; }
        public bool IsProduct { get; set; }
        public bool IsLocation { get; set; }
    }
}
