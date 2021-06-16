using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Data;
using Mb.Models.Enums;
using Attribute = Mb.Models.Data.Attribute;
using NodeType = Mb.Models.Enums.NodeType;

namespace Mb.Core.Profiles
{
    public class NodeProfile : Profile
    {
        public NodeProfile(ICommonRepository commonRepository)
        {
            CreateMap<AttributeType, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateUniqueId()))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.Node, opt => opt.Ignore());
        }

        public static NodeType MapNodeType(Aspect aspect)
        {
            return aspect switch
            {
                Aspect.Function => NodeType.Function,
                Aspect.Product => NodeType.Product,
                Aspect.Location => NodeType.Location,
                _ => NodeType.NotSet
            };
        }
    }

   
}
