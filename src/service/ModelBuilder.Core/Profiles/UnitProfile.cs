using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles;

public class UnitProfile : Profile
{
    public UnitProfile()
    {
        CreateMap<UnitAm, Unit>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.UnitType, opt => opt.MapFrom(src => src.UnitType))
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol));

        CreateMap<Unit, UnitCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.UnitType, opt => opt.MapFrom(src => src.UnitType))
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol));

        CreateMap<Unit, UnitAm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.UnitType, opt => opt.MapFrom(src => src.UnitType))
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol));
    }
}