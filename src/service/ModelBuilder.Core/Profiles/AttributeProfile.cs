using AutoMapper;
using Mb.Models.Application;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile()
        {
            CreateMap<AttributeAm, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.SpecifiedScope, opt => opt.MapFrom(src => src.SpecifiedScope))
                .ForMember(dest => dest.SpecifiedProvenance, opt => opt.MapFrom(src => src.SpecifiedProvenance))
                .ForMember(dest => dest.RangeSpecifying, opt => opt.MapFrom(src => src.RangeSpecifying))
                .ForMember(dest => dest.RegularitySpecified, opt => opt.MapFrom(src => src.RegularitySpecified))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.AttributeTypeIri, opt => opt.MapFrom(src => src.AttributeTypeIri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.UnitString, opt => opt.MapFrom(src => src.Units != null ? JsonConvert.SerializeObject(src.Units) : null))
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.TerminalIri, opt => opt.MapFrom(src => src.TerminalIri))
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.Interface, opt => opt.Ignore())
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.InterfaceId))
                .ForMember(dest => dest.InterfaceIri, opt => opt.MapFrom(src => src.InterfaceIri))
                .ForMember(dest => dest.Transport, opt => opt.Ignore())
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.TransportIri, opt => opt.MapFrom(src => src.TransportIri))
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore());

            CreateMap<Attribute, AttributeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.AttributeTypeIri, opt => opt.MapFrom(src => src.AttributeTypeIri))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.SpecifiedScope, opt => opt.MapFrom(src => src.SpecifiedScope))
                .ForMember(dest => dest.SpecifiedProvenance, opt => opt.MapFrom(src => src.SpecifiedProvenance))
                .ForMember(dest => dest.RangeSpecifying, opt => opt.MapFrom(src => src.RangeSpecifying))
                .ForMember(dest => dest.RegularitySpecified, opt => opt.MapFrom(src => src.RegularitySpecified))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.TransportIri, opt => opt.MapFrom(src => src.TransportIri))
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.InterfaceId))
                .ForMember(dest => dest.InterfaceIri, opt => opt.MapFrom(src => src.InterfaceIri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units));
        }
    }
}