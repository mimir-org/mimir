using System;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;
using Newtonsoft.Json;

namespace Mb.Core.Profiles
{
    public class AspectObjectProfile : Profile
    {
        public AspectObjectProfile(IHttpContextAccessor contextAccessor)
        {
            CreateMap<AspectObjectAm, AspectObject>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.TypeReference, opt => opt.MapFrom(src => src.TypeReferences != null ? JsonConvert.SerializeObject(src.TypeReferences) : null))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Position, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Position)))
                .ForMember(dest => dest.IsLocked, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.UpdatedBy) ? contextAccessor.GetName() : src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated ?? DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.LibraryType, opt => opt.MapFrom(src => src.LibraryTypeId))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.AspectObjectType, opt => opt.MapFrom(src => src.AspectObjectType))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Width))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Height))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.ProjectObject, opt => opt.Ignore())
                .ForMember(dest => dest.Purpose, opt => opt.Ignore())
                .ForMember(dest => dest.ParentAspectObjectId, opt => opt.Ignore())
                .ForMember(dest => dest.Selected, opt => opt.Ignore())
                .ForMember(dest => dest.BlockSelected, opt => opt.Ignore())
                .ForMember(dest => dest.Hidden, opt => opt.Ignore())
                .ForMember(dest => dest.BlockHidden, opt => opt.Ignore())
                .ForMember(dest => dest.IsOffPageTarget, opt => opt.Ignore())
                .ForMember(dest => dest.IsOffPageRequired, opt => opt.Ignore());

            CreateMap<AspectObject, AspectObjectAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.Project))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.TypeReferences, opt => opt.MapFrom(src => src.TypeReferenceObjects))
                .ForMember(dest => dest.Position, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<AspectObjectPosition>(src.Position)))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Width))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Height))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MainProject))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.LibraryTypeId, opt => opt.MapFrom(src => src.LibraryType))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.AspectObjectType, opt => opt.MapFrom(src => src.AspectObjectType));
        }
    }
}