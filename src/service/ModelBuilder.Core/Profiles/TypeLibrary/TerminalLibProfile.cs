using AutoMapper;
using Mb.Models.Data;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class TerminalLibProfile : Profile
    {
        public TerminalLibProfile()
        {
            CreateMap<TerminalLibCm, Terminal>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        }
    }
}