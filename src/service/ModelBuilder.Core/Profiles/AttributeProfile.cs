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
        CreateMap<AttributeAm, Attribute>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
            .ForMember(dest => dest.Block, opt => opt.MapFrom(src => src.Block));

        CreateMap<Attribute, AttributeCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<UnitCm>(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<QualifierCm>(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
            .ForMember(dest => dest.Block, opt => opt.MapFrom(src => src.Block));

        CreateMap<Attribute, AttributeAm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<UnitAm>(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<QualifierAm>(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.ConnectorTerminal))
            .ForMember(dest => dest.Block, opt => opt.MapFrom(src => src.Block));
    }
}