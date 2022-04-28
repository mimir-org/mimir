using AutoMapper;
using Mb.Models.Data.TypeEditor;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class Generic : Profile
    {
        public Generic()
        {
            CreateMap<RdsLibCm, Rds>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri));
        }
    }
}
