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
using Mb.Services.Contracts;

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
        /// <param name="webSocketEvent"></param>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog(WorkerStatus webSocketEvent)
        {
            return _eventLogRepository.GetAll()
                .Where(x => x.WebSocketEvent == webSocketEvent)
                .OrderBy(x => x.DateTime)
                .ToList();
        }

        /// <summary>
        /// Get all logs for type and event
        /// </summary>
        /// <param name="eventLogDataType"></param>
        /// <param name="webSocketEvent"></param>
        /// <returns></returns>
        public IEnumerable<EventLog> ReadLog(EventLogDataType eventLogDataType, WorkerStatus webSocketEvent)
        {
            return _eventLogRepository.GetAll()
                .Where(x => x.WebSocketEvent == webSocketEvent && 
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
    }
}
