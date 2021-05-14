using System;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Models.Data;
using Mb.Models.Enums;
using Attribute = Mb.Models.Data.Attribute;
using EnumExtensions = Microsoft.OpenApi.Extensions.EnumExtensions;

namespace Mb.Core.Profiles
{
    public class NodeProfile : Profile
    {
        public NodeProfile()
        {
            CreateMap<LibraryTypeComponent, LibNode>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.TypeName))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.TypeName))
                .ForMember(dest => dest.Icon, opt => opt.MapFrom(src => MapIconType(src.ObjectType, src.Aspect)))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => MapNodeType(src.Aspect)))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Terminals))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.RdsCategory.GetDisplayName()))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

            CreateMap<Terminal, Connector>()
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.TerminalType.GetDisplayName()))
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => RelationType.Transport))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => TerminalCategory.NotSet))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.ConnectorType));

            CreateMap<AttributeType, Attribute>()
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

        public static IconType MapIconType(ObjectType objectType, Aspect aspect)
        {
            return objectType switch
            {
                ObjectType.NotSet => IconType.NotSetIcon,
                ObjectType.ObjectBlock => aspect switch
                {
                    Aspect.Function => IconType.FunctionIcon,
                    Aspect.Product => IconType.ProductIcon,
                    Aspect.Location => IconType.LocationIcon,
                    _ => IconType.NotSetIcon
                },
                ObjectType.Interface => IconType.InterfaceIcon,
                ObjectType.Transport => IconType.TransportIcon,
                _ => throw new ArgumentOutOfRangeException(nameof(objectType), objectType, null)
            };
        }
    }

   
}
