﻿using Mb.Models.Enums;
using Newtonsoft.Json;

namespace Mb.Models.Application
{
    public class TerminalTypeItem
    {
        public string TerminalTypeId { get; set; }
        public int Number { get; set; }
        public ConnectorType ConnectorType { get; set; }

        [JsonIgnore]
        public string Key => $"{TerminalTypeId}-{ConnectorType}";
    }
}