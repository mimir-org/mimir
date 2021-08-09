using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class EdgeProfile : Profile
    {
        public EdgeProfile(ICommonRepository commonRepository)
        {
            CreateMap<EdgeAm, Edge>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => src.FromConnectorId))
                .ForMember(dest => dest.FromConnector, opt => opt.Ignore())
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => src.ToConnectorId))
                .ForMember(dest => dest.ToConnector, opt => opt.Ignore())
                .ForMember(dest => dest.FromNodeId, opt => opt.MapFrom(src => src.FromNodeId))
                .ForMember(dest => dest.FromNode, opt => opt.Ignore())
                .ForMember(dest => dest.ToNodeId, opt => opt.MapFrom(src => src.ToNodeId))
                .ForMember(dest => dest.ToNode, opt => opt.Ignore())
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.Transport.Id))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.Interface.Id))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.MasterProject, opt => opt.Ignore())
                .ForMember(dest => dest.IsTemplateEdge, opt => opt.MapFrom(src => src.IsTemplateEdge))
                .ForMember(dest => dest.Projects, opt => opt.Ignore());
        }
    }
}
