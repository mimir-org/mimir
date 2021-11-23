using System.Collections.Generic;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Workers;

namespace Mb.Services.Contracts
{
    public interface IEventLogService
    {
        Task<IEnumerable<EventLog>> CreateLogs(ProjectWorker worker);
        Task<EventLog> CreateLog(EventLogAm eventLog);
        IEnumerable<EventLog> ReadLog();
        IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType);
        IEnumerable<EventLog> ReadLog(WorkerStatus workerStatus);
        IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType, WorkerStatus workerStatus);
        Task Delete(int id);
        Task DeleteDuplicates();
        Task DeleteAll();
        Task<EventLog> Get(int id);
    }
}
