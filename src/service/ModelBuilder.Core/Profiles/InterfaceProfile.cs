using AutoMapper;
using Mb.Data.Contracts;
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
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => src.InputTerminalId))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => src.OutputTerminalId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Edges, opt => opt.Ignore());

            CreateMap<Interface, InterfaceAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => src.InputTerminalId))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => src.OutputTerminalId))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal));
        }
    }
}
