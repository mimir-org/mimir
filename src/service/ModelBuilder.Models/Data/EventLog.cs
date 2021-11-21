using System;
using Mb.Models.Enums;

namespace Mb.Models.Data
{
    public class EventLog
    {
        public int Id { get; set; }
        public string DataId { get; set; }
        public DateTime DateTime { get; set; }
        public string Data { get; set; }
        public EventLogDataType EventLogDataType { get; set; }
        public WorkerStatus WebSocketEvent { get; set; }
    }
}
