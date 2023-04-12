using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Common;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;
using System;

namespace Mb.Core.Profiles;

public class LockProfile : Profile
{
    public LockProfile(IHttpContextAccessor contextAccessor)
    {
        CreateMap<LockAm, LockDm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(contextAccessor.GetName()) ? "Unknown" : contextAccessor.GetName()))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => DateTime.Now.ToUniversalTime()));

        CreateMap<LockDm, LockCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate));

        CreateMap<LockDm, LockAm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked));
    }
}