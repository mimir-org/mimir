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
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnit, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.SpecifiedScope, opt => opt.MapFrom(src => src.SpecifiedScope))
                .ForMember(dest => dest.SpecifiedProvenance, opt => opt.MapFrom(src => src.SpecifiedProvenance))
                .ForMember(dest => dest.RangeSpecifying, opt => opt.MapFrom(src => src.RangeSpecifying))
                .ForMember(dest => dest.RegularitySpecified, opt => opt.MapFrom(src => src.RegularitySpecified))
                .ForMember(dest => dest.AttributeType, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.UnitString, opt => opt.MapFrom(src => src.Units != null ? JsonConvert.SerializeObject(src.Units) : null))
                .ForMember(dest => dest.ConnectorTerminal, opt => opt.Ignore())
                .ForMember(dest => dest.ConnectorTerminal, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.AspectObject, opt => opt.Ignore())
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObjectId))
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore());

            CreateMap<Attribute, AttributeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnit))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeType))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.SpecifiedScope, opt => opt.MapFrom(src => src.SpecifiedScope))
                .ForMember(dest => dest.SpecifiedProvenance, opt => opt.MapFrom(src => src.SpecifiedProvenance))
                .ForMember(dest => dest.RangeSpecifying, opt => opt.MapFrom(src => src.RangeSpecifying))
                .ForMember(dest => dest.RegularitySpecified, opt => opt.MapFrom(src => src.RegularitySpecified))
                .ForMember(dest => dest.AspectObjectId, opt => opt.MapFrom(src => src.AspectObject))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units));
        }
    }
}