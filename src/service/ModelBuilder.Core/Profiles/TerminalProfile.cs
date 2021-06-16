using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class TerminalProfile : Profile
    {
        public TerminalProfile(ICommonRepository commonRepository)
        {
            CreateMap<CreateTerminalType, TerminalType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Key.CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.ConvertToObject));

            CreateMap<TerminalType, Terminal>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateUniqueId()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalCategoryId, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.TerminalCategory))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));
        }
    }
}
