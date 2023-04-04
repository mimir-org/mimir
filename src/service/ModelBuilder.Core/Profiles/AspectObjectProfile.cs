using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Core.Profiles;

public class AspectObjectProfile : Profile
{
    public AspectObjectProfile()
    {
        CreateMap<AspectObjectAm, AspectObjectDm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
            .ForMember(dest => dest.AspectObjectType, opt => opt.MapFrom(src => src.AspectObjectType))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
            .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
            .ForMember(dest => dest.LibraryType, opt => opt.MapFrom(src => src.LibraryType))
            .ForMember(dest => dest.Position, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Position)))
            .ForMember(dest => dest.ReferenceType, opt => opt.MapFrom(src => src.ReferenceType))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
            .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
            .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
            .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

        CreateMap<AspectObjectDm, AspectObjectCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
            .ForMember(dest => dest.AspectObjectType, opt => opt.MapFrom(src => src.AspectObjectType))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
            .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
            .ForMember(dest => dest.LibraryType, opt => opt.MapFrom(src => src.LibraryType))
            .ForMember(dest => dest.Position, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<AspectObjectPositionCm>(src.Position)))
            .ForMember(dest => dest.ReferenceType, opt => opt.MapFrom(src => src.ReferenceType))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
            .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
            .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
            .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
            .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

        CreateMap<AspectObjectPositionAm, AspectObjectPositionDm>()
            .ForMember(dest => dest.ThreePosX, opt => opt.MapFrom(src => src.ThreePosX))
            .ForMember(dest => dest.ThreePosY, opt => opt.MapFrom(src => src.ThreePosY))
            .ForMember(dest => dest.BlockPosX, opt => opt.MapFrom(src => src.BlockPosX))
            .ForMember(dest => dest.BlockPosY, opt => opt.MapFrom(src => src.BlockPosY));

        CreateMap<AspectObjectPositionDm, AspectObjectPositionCm>()
            .ForMember(dest => dest.ThreePosX, opt => opt.MapFrom(src => src.ThreePosX))
            .ForMember(dest => dest.ThreePosY, opt => opt.MapFrom(src => src.ThreePosY))
            .ForMember(dest => dest.BlockPosX, opt => opt.MapFrom(src => src.BlockPosX))
            .ForMember(dest => dest.BlockPosY, opt => opt.MapFrom(src => src.BlockPosY));
    }
}