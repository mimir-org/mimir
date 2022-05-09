using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;

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
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.TerminalCategoryId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.ConvertToObject));

            CreateMap<TerminalType, Terminal>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateId()))
                .ForMember(dest => dest.Iri, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.TerminalCategory))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TerminalTypeIri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));
        }
    }
}