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
                .ForMember(dest => dest.FromAspectObject, opt => opt.MapFrom(src => src.FromAspectObjectId))
                .ForMember(dest => dest.ToAspectObject, opt => opt.MapFrom(src => src.ToAspectObjectId))
                .ForMember(dest => dest.FromConnectorObject, opt => opt.Ignore())
                .ForMember(dest => dest.ToConnectorObject, opt => opt.Ignore())
                .ForMember(dest => dest.FromAspectObjectObject, opt => opt.Ignore())
                .ForMember(dest => dest.ToAspectObjectObject, opt => opt.Ignore())
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.ProjectObject, opt => opt.Ignore())
                .ForMember(dest => dest.Selected, opt => opt.Ignore())
                .ForMember(dest => dest.Hidden, opt => opt.Ignore())
                .ForMember(dest => dest.BlockHidden, opt => opt.Ignore());
            CreateMap<Connection, ConnectionAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.FromAspectObjectId, opt => opt.MapFrom(src => src.FromAspectObject))
                .ForMember(dest => dest.ToAspectObjectId, opt => opt.MapFrom(src => src.ToAspectObject))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MainProject));
        }
    }
}