using System.Collections.Generic;
using Newtonsoft.Json;

namespace Mb.Models.Data.TypeEditor
{
    public class Rds
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Iri { get; set; }
        [JsonIgnore] public ICollection<LibraryType> LibraryTypes { get; set; }
    }
}