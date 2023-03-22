using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Core.Profiles;

public class AttributeProfile : Profile
{
    public AttributeProfile()
    {
        CreateMap<AttributeAm, AttributeDm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
            .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject))
            .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore());

        CreateMap<AttributeDm, AttributeCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<UnitCm>(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<QualifierCm>(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
            .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate));
    }
}