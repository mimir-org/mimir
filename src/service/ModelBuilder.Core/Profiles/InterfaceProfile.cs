using AutoMapper;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class InterfaceProfile : Profile
    {
        public InterfaceProfile(ICommonRepository commonRepository)
        {
            CreateMap<InterfaceAm, Interface>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.Edges, opt => opt.Ignore());
        }
    }
}
