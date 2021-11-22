﻿using System;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Services.Extensions;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile(IHttpContextAccessor contextAccessor, ICommonRepository commonRepository)
        {
            CreateMap<Project, ProjectSimple>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ProjectOwner, opt => opt.MapFrom(src => src.ProjectOwner))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated));

            CreateMap<ProjectAm, Project>()
                .ForMember(dest => dest.Id, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsSubProject, opt => opt.MapFrom(src => src.IsSubProject))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ProjectOwner, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => contextAccessor.GetName() ?? src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
                .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges));

            CreateMap<Project, ProjectAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsSubProject, opt => opt.MapFrom(src => src.IsSubProject))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ProjectOwner, opt => opt.MapFrom(src => src.ProjectOwner))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Nodes, opt => opt.MapFrom(src => src.Nodes))
                .ForMember(dest => dest.Edges, opt => opt.MapFrom(src => src.Edges));
        }
    }
}
