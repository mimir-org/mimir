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
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project));
                
            CreateMap<Connection, ConnectionAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project));
        }
    }
}