using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Application.TypeEditor
{
    public class TerminalTypeItem
    {
        public string TerminalTypeId { get; set; }
        public int Number { get; set; }
        public ConnectorType ConnectorType { get; set; }

        public string CategoryId { get; set; }

        [JsonIgnore]
        public string Key => $"{TerminalTypeId}-{ConnectorType}";
    }
}
