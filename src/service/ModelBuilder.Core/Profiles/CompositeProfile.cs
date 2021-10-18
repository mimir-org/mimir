using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;

namespace Mb.Core.Profiles
{
    public class CompositeProfile : Profile
    {
        public CompositeProfile(ICommonRepository commonRepository)
        {
            CreateMap<CompositeAm, Composite>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.Node, opt => opt.Ignore());

            CreateMap<Composite, CompositeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId));

            CreateMap<CompositeTypeAm, CompositeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Key.CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()))
                .ForMember(dest => dest.NodeTypes, opt => opt.Ignore());
        }
        
        private static IEnumerable<AttributeType> CreateAttributeTypes(IReadOnlyCollection<string> attributeTypes)
        {
            if (attributeTypes == null || !attributeTypes.Any())
                yield break;

            foreach (var item in attributeTypes)
                yield return new AttributeType
                {
                    Id = item
                };
        }
    }
}
