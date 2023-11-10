using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles;

public class QualifierProfile : Profile
{
    public QualifierProfile()
    {
        CreateMap<QualifierAm, Qualifier>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value));

        CreateMap<Qualifier, QualifierCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value));

        CreateMap<Qualifier, QualifierAm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value));
    }
}