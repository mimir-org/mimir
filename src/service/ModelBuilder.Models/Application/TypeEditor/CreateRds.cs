using Newtonsoft.Json;

namespace Mb.Models.Application.TypeEditor
{
    public class CreateRds
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Iri { get; set; }
        [JsonIgnore] public string Key => $"{Code}";
    }
}