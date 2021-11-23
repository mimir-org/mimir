using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class EventLogProfile : Profile
    {
        public EventLogProfile()
        {
            CreateMap<EventLogAm, EventLog>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.DataId, opt => opt.MapFrom(src => src.DataId))
                .ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => src.DateTime))
                .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
                .ForMember(dest => dest.EventLogDataType, opt => opt.MapFrom(src => src.EventLogDataType))
                .ForMember(dest => dest.WorkerStatus, opt => opt.MapFrom(src => src.WorkerStatus));

            CreateMap<EventLog, EventLogAm>()
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.DataId, opt => opt.MapFrom(src => src.DataId))
                .ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => src.DateTime))
                .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.Data))
                .ForMember(dest => dest.EventLogDataType, opt => opt.MapFrom(src => src.EventLogDataType))
                .ForMember(dest => dest.WorkerStatus, opt => opt.MapFrom(src => src.WorkerStatus));
        }
    }
}
