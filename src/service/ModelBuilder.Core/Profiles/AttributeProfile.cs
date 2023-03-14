using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
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
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnit, opt => opt.MapFrom(src => src.SelectedUnit))
                .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Qualifiers)))
                .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.UnitString, opt => opt.MapFrom(src => src.Units != null ? JsonConvert.SerializeObject(src.Units) : null))
                .ForMember(dest => dest.ConnectorTerminal, opt => opt.Ignore())
                .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
                .ForMember(dest => dest.AspectObject, opt => opt.Ignore())
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject))
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore());

            CreateMap<Attribute, AttributeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnit, opt => opt.MapFrom(src => src.SelectedUnit))
                .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<Qualifiers>(src.Qualifiers)))
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units));
        }
    }
}