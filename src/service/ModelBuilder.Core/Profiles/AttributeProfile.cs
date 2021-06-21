using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile(ICommonRepository commonRepository)
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

            CreateMap<AttributeType, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateUniqueId()))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.TerminalId, opt => opt.Ignore())
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.Node, opt => opt.Ignore());
        }
    }
}
