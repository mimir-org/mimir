using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Extensions;
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
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
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
                .ForMember(dest => dest.Simple, opt => opt.Ignore())
                .ForMember(dest => dest.SimpleId, opt => opt.MapFrom(src => src.SimpleId))
                .ForMember(dest => dest.SimpleIri, opt => opt.MapFrom(src => src.SimpleIri))
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore())
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.SelectValues, opt => opt.Ignore())
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()));

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
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.TransportIri, opt => opt.MapFrom(src => src.TransportIri))
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.InterfaceId))
                .ForMember(dest => dest.InterfaceIri, opt => opt.MapFrom(src => src.InterfaceIri))
                .ForMember(dest => dest.SimpleId, opt => opt.MapFrom(src => src.SimpleId))
                .ForMember(dest => dest.SimpleIri, opt => opt.MapFrom(src => src.SimpleIri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.SelectValues, opt => opt.MapFrom(src => src.SelectValues))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline));
        }
    }
}