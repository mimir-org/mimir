using AutoMapper;
using Mb.Core.Extensions;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile()
        {
            CreateMap<CreateAttributeType, AttributeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Key.CreateMd5()))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.QualifierId))
                .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.SourceId))
                .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.ConditionId))
                .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.FormatId))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.ConvertToObject));
        }
    }
}
