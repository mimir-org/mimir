using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mb.Models.Exceptions;
using Mb.Models.Extensions;
using Mb.Models.Workers;
using Mb.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Mb.Services.Services
{
    public class EventLogService : IEventLogService
    {
        private readonly IEventLogRepository _eventLogRepository;
        private readonly IMapper _mapper;

        #region Constructor

        public EventLogService(IEventLogRepository eventLogRepository, IMapper mapper)
        {
            _eventLogRepository = eventLogRepository;
            _mapper = mapper;
        }

        #endregion

        #region Public methods

        public async Task<IEnumerable<EventLog>> CreateLogs(ProjectWorker worker)
        {
            var logs = new List<EventLog>();

            if (worker == null)
                return logs;

            foreach (var obj in worker.Nodes.Select(n => new EventLogAm(n.Node) {WorkerStatus = n.WorkerStatus, ProjectId = worker.ProjectId }).Select(log => _mapper.Map<EventLog>(log)))
            {
                await _eventLogRepository.CreateAsync(obj);
                logs.Add(obj);
            }

            foreach (var obj in worker.Edges.Select(n => new EventLogAm(n.Edge) { WorkerStatus = n.WorkerStatus, ProjectId = worker.ProjectId }).Select(log => _mapper.Map<EventLog>(log)))
            {
                await _eventLogRepository.CreateAsync(obj);
                logs.Add(obj);
            }

            await _eventLogRepository.SaveAsync();
            return logs;
        }

        /// <summary>
        /// Create a new log event used for websocket
        /// </summary>
        /// <param name="eventLog"></param>
        /// <returns></returns>
        public async Task<EventLog> CreateLog(EventLogAm eventLog)
        {
            if (eventLog == null)
                throw new ModelBuilderInvalidOperationException("Can't create event from null object");

            var validation = eventLog.ValidateObject();
            if (!validation.IsValid)
                throw new ModelBuilderBadRequestException($"Couldn't create sub-project with name: {eventLog.DataId}", validation);

            var obj = _mapper.Map<EventLog>(eventLog);
            await _eventLogRepository.CreateAsync(obj);
            await _eventLogRepository.SaveAsync();
            return obj;
        }

        /// <summary>
        /// Get all logs
        /// </summary>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog()
        {
            return _eventLogRepository.GetAll()
                .OrderBy(x => x.DateTime)
                .ToList();
        }

        /// <summary>
        /// Get all logs for type
        /// </summary>
        /// <param name="eventLogDataType"></param>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType)
        {
            return _eventLogRepository.GetAll()
                .Where(x => x.EventLogDataType == eventLogDataType)
                .OrderBy(x => x.DateTime)
                .ToList();
        }

        /// <summary>
        /// Get all logs for event
        /// </summary>
        /// <param name="workerStatus"></param>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog(WorkerStatus workerStatus)
        {
            return _eventLogRepository.GetAll()
                .Where(x => x.WorkerStatus == workerStatus)
                .OrderBy(x => x.DateTime)
                .ToList();
        }

        /// <summary>
        /// Get all logs for type and event
        /// </summary>
        /// <param name="eventLogDataType"></param>
        /// <param name="workerStatus"></param>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType, WorkerStatus workerStatus)
        {
            return _eventLogRepository.GetAll()
                .Where(x => x.WorkerStatus == workerStatus && 
                            x.EventLogDataType == eventLogDataType)
                .OrderBy(x => x.DateTime)
                .ToList();
        }

        /// <summary>
        /// Delete log by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Delete(int id)
        {
            await _eventLogRepository.Delete(id);
            await _eventLogRepository.SaveAsync();
        }

        /// <summary>
        /// Delete all duplicate log entries.
        /// Keep only the latest entry.
        /// </summary>
        /// <returns></returns>
        public async Task DeleteDuplicates()
        {
            _eventLogRepository.Context?.ChangeTracker?.Clear();
            var logEntries = ReadLog().OrderBy(x => x.Id).GroupBy(x => x.DataId).ToList();
            foreach (var entry in logEntries)
            {
                SetCleanupStatus(WorkerStatus.Update, entry);
                SetCleanupStatus(WorkerStatus.Delete, entry);
                SetCleanupStatus(WorkerStatus.Create, entry);
            }

            await _eventLogRepository.SaveAsync();
        }

        /// <summary>
        /// Delete all log
        /// </summary>
        /// <returns></returns>
        public async Task DeleteAll()
        {
            var logs = ReadLog();

            foreach (var log in logs)
            {
                await _eventLogRepository.Delete(log.Id);
            }

            await _eventLogRepository.SaveAsync();
        }

        /// <summary>
        /// Get log by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<EventLog> Get(int id)
        {
            return await _eventLogRepository.GetAsync(id);
        }

        #endregion

        #region Private Methods

        private void SetCleanupStatus(WorkerStatus status, IEnumerable<EventLog> events)
        {
            var items = events.Where(x => x.WorkerStatus == status).ToList();

            for (var i = 0; i < items.Count; i++)
            {
                var entityState = EntityState.Deleted;

                if (i == items.Count - 1)
                    entityState = EntityState.Unchanged;

                _eventLogRepository.Attach(items.ElementAt(i), entityState);    
            }
        }

        #endregion
    }
}
