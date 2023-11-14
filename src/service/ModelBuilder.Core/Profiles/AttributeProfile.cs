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
        CreateMap<AttributeRequest, Attribute>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Qualifiers)))
            .ForMember(dest => dest.Terminal, opt => opt.MapFrom(src => src.Terminal))
            .ForMember(dest => dest.BlockId, opt => opt.MapFrom(src => src.Block));

        CreateMap<Attribute, AttributeResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<UnitResponse>(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<QualifierResponse>(src.Qualifiers)))
            .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.Terminal))
            .ForMember(dest => dest.Block, opt => opt.MapFrom(src => src.BlockId));

        CreateMap<Attribute, AttributeRequest>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
            .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeType))
            .ForMember(dest => dest.UnitSelected, opt => opt.MapFrom(src => src.UnitSelected))
            .ForMember(dest => dest.Units, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<UnitRequest>(src.Units)))
            .ForMember(dest => dest.Qualifiers, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<QualifierRequest>(src.Qualifiers)))
            .ForMember(dest => dest.Terminal, opt => opt.MapFrom(src => src.Terminal))
            .ForMember(dest => dest.Block, opt => opt.MapFrom(src => src.BlockId));
    }
}