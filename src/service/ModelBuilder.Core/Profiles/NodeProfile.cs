using System;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Profiles
{
    public class NodeProfile : Profile
    {
        public NodeProfile(IHttpContextAccessor contextAccessor, ICommonRepository commonRepository)
        {
            CreateMap<NodeAm, Node>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Contractor, opt => opt.MapFrom(src => src.Contractor))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.TagNumber, opt => opt.MapFrom(src => src.TagNumber))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.PositionX, opt => opt.MapFrom(src => src.PositionX))
                .ForMember(dest => dest.PositionY, opt => opt.MapFrom(src => src.PositionY))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedBy, opt => opt.MapFrom(src => src.IsLockedBy))
                .ForMember(dest => dest.PositionBlockX, opt => opt.MapFrom(src => src.PositionBlockX))
                .ForMember(dest => dest.PositionBlockY, opt => opt.MapFrom(src => src.PositionBlockY))
                .ForMember(dest => dest.Level, opt => opt.Ignore())
                .ForMember(dest => dest.Order, opt => opt.Ignore())
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => contextAccessor.GetName()))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Created, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.Length, opt => opt.MapFrom(src => src.Length))
                .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Width))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Height))
                .ForMember(dest => dest.Cost, opt => opt.MapFrom(src => src.Cost))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol));
        }
    }
}