using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class EdgeProfile : Profile
    {
        public EdgeProfile()
        {
            CreateMap<EdgeAm, Edge>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => src.FromConnectorId))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => src.ToConnectorId))
                .ForMember(dest => dest.FromNodeId, opt => opt.MapFrom(src => src.FromNodeId))
                .ForMember(dest => dest.ToNodeId, opt => opt.MapFrom(src => src.ToNodeId))
                .ForMember(dest => dest.FromConnector, opt => opt.Ignore())
                .ForMember(dest => dest.ToConnector, opt => opt.Ignore())
                .ForMember(dest => dest.FromNode, opt => opt.Ignore())
                .ForMember(dest => dest.ToNode, opt => opt.Ignore())
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore())
                .ForMember(dest => dest.FromConnectorIri, opt => opt.MapFrom(src => src.FromConnectorIri))
                .ForMember(dest => dest.ToConnectorIri, opt => opt.MapFrom(src => src.ToConnectorIri))
                .ForMember(dest => dest.FromNodeIri, opt => opt.MapFrom(src => src.FromNodeIri))
                .ForMember(dest => dest.ToNodeIri, opt => opt.MapFrom(src => src.ToNodeIri))
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.Transport.Id))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.Interface.Id))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.Project, opt => opt.Ignore());
            CreateMap<Edge, EdgeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.FromConnectorId, opt => opt.MapFrom(src => src.FromConnectorId))
                .ForMember(dest => dest.ToConnectorId, opt => opt.MapFrom(src => src.ToConnectorId))
                .ForMember(dest => dest.FromNodeId, opt => opt.MapFrom(src => src.FromNodeId))
                .ForMember(dest => dest.ToNodeId, opt => opt.MapFrom(src => src.ToNodeId))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.FromConnectorIri, opt => opt.MapFrom(src => src.FromConnectorIri))
                .ForMember(dest => dest.ToConnectorIri, opt => opt.MapFrom(src => src.ToConnectorIri))
                .ForMember(dest => dest.FromNodeIri, opt => opt.MapFrom(src => src.FromNodeIri))
                .ForMember(dest => dest.ToNodeIri, opt => opt.MapFrom(src => src.ToNodeIri))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.Transport, opt => opt.MapFrom(src => src.Transport))
                .ForMember(dest => dest.Interface, opt => opt.MapFrom(src => src.Interface));
        }
    }
}