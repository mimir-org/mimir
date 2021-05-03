using AutoMapper;
using Mb.Models;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<Project, ProjectSimple>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ProjectOwner, opt => opt.MapFrom(src => src.ProjectOwner))
                .ForMember(dest => dest.LastEdited, opt => opt.MapFrom(src => src.LastEdited));

            //CreateMap<Project, ProjectAm>()
            //    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //    .ForMember(dest => dest.ProjectOwner, opt => opt.MapFrom(src => src.ProjectOwner))
            //    .ForMember(dest => dest.LastEdited, opt => opt.MapFrom(src => src.LastEdited))
            //    .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
            //    .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges));

            //CreateMap<ProjectAm, Project>()
            //    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //    .ForMember(dest => dest.ProjectOwner, opt => opt.MapFrom(src => src.ProjectOwner))
            //    .ForMember(dest => dest.LastEdited, opt => opt.MapFrom(src => src.LastEdited))
            //    .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
            //    .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges));
        }
    }
}
