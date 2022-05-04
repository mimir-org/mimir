using AutoMapper;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class TerminalLibProfile : Profile
    {
        public TerminalLibProfile()
        {
            CreateMap<TerminalLibCm, TerminalType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => FindTerminalCategoryId(src)))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => FindTerminalCategory(src)))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.NodeTypes, opt => opt.Ignore())
                .ForMember(dest => dest.InterfaceTypes, opt => opt.Ignore())
                .ForMember(dest => dest.TransportTypes, opt => opt.Ignore());
        }

        private string FindTerminalCategoryId(TerminalLibCm src)
        {
            return string.IsNullOrWhiteSpace(src?.ParentId) ? null : src.ParentId;
        }

        private TerminalCategory FindTerminalCategory(TerminalLibCm src)
        {
            if (src.Parent == null)
                return null;

            return new TerminalCategory
            {
                Id = src.Parent.Id,
                Name = src.Parent.Name,
                Aspect = Aspect.NotSet,
                ParentId = src.Parent.ParentId,
                Parent = null,
                Children = null,
                Description = null,
                SemanticReference = null
            };
        }
    }
}