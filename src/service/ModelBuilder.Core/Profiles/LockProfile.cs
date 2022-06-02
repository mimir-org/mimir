using System;
using AutoMapper;
using Mb.Models.Application;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;

namespace Mb.Core.Profiles
{
    public class LockProfile : Profile
    {
        public LockProfile(IHttpContextAccessor contextAccessor)
        {
            CreateMap<LockAm, LockDm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(contextAccessor.GetName()) ? "Unknown" : contextAccessor.GetName()))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));

            CreateMap<LockDm, LockCm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.ProjectId))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));
        }
    }
}