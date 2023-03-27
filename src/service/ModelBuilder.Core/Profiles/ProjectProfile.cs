using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Mb.Models.Data;

namespace Mb.Core.Profiles;

public class ProjectProfile : Profile
{
    public ProjectProfile()
    {
        CreateMap<ProjectAm, ProjectDm>()
            .ForMember(dest => dest.Id, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.Version, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.SubProject, opt => opt.MapFrom(src => src.SubProject))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.UpdatedBy, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.Updated, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.CreatedBy, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.Created, opt => opt.UseDestinationValue())
            .ForMember(dest => dest.AspectObjects, opt => opt.MapFrom(src => src.AspectObjects))
            .ForMember(dest => dest.Connections, opt => opt.MapFrom(src => src.Connections));

        CreateMap<ProjectDm, ProjectCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.SubProject, opt => opt.MapFrom(src => src.SubProject))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.AspectObjects, opt => opt.MapFrom(src => src.AspectObjects))
            .ForMember(dest => dest.Connections, opt => opt.MapFrom(src => src.Connections));

        CreateMap<ProjectDm, LibrarySubProjectVersion>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version));

        CreateMap<ProjectDm, LibrarySubProject>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Versions, opt => opt.Ignore());
    }
}