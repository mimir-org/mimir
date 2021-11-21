using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;

namespace Mb.Services.Contracts
{
    public interface IEventLogService
    {
        Task<EventLog> CreateLog(EventLogAm eventLog);
        IEnumerable<EventLog> ReadLog();
        IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType);
        IEnumerable<EventLog> ReadLog(WorkerStatus webSocketEvent);
        IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType, WorkerStatus webSocketEvent);
        Task Delete(int id);
        Task DeleteAll();
        Task<EventLog> Get(int id);
    }
}
