using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectionProfile : Profile
    {
        public ConnectionProfile()
        {
            CreateMap<ConnectionAm, Connection>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnectorId))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnectorId))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.ProjectId));
                
            CreateMap<Connection, ConnectionAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MainProject));
        }
    }
}