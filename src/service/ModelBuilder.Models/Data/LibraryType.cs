using System.ComponentModel.DataAnnotations;
using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Data
{
    public class LibraryType
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Status Status { get; set; }
        public string SemanticReference { get; set; }

        public string RdsId { get; set; }
        public Rds Rds { get; set; }
    }
}
