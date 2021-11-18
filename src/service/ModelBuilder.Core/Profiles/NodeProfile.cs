using System;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Services.Extensions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Mb.Core.Profiles
{
    public class NodeProfile : Profile
    {
        public NodeProfile(IHttpContextAccessor contextAccessor, ICommonRepository commonRepository)
        {
            CreateMap<NodeAm, Node>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
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
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.UpdatedBy) ? contextAccessor.GetName() : src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated ?? DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.Length, opt => opt.MapFrom(src => src.Length))
                .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Width))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Height))
                .ForMember(dest => dest.Cost, opt => opt.MapFrom(src => src.Cost))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
                .ForMember(dest => dest.PurposeString, opt => opt.MapFrom(src => SerializePurpose(src)));

            CreateMap<Node, NodeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Domain, opt => opt.MapFrom(src => src.Domain))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.PositionX, opt => opt.MapFrom(src => src.PositionX))
                .ForMember(dest => dest.PositionY, opt => opt.MapFrom(src => src.PositionY))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedBy, opt => opt.MapFrom(src => src.IsLockedBy))
                .ForMember(dest => dest.PositionBlockX, opt => opt.MapFrom(src => src.PositionBlockX))
                .ForMember(dest => dest.PositionBlockY, opt => opt.MapFrom(src => src.PositionBlockY))
                .ForMember(dest => dest.Length, opt => opt.MapFrom(src => src.Length))
                .ForMember(dest => dest.Width, opt => opt.MapFrom(src => src.Width))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.Height))
                .ForMember(dest => dest.Cost, opt => opt.MapFrom(src => src.Cost))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.MasterProjectId, opt => opt.MapFrom(src => src.MasterProjectId))
                .ForMember(dest => dest.MasterProjectIri, opt => opt.MapFrom(src => src.MasterProjectIri))
                .ForMember(dest => dest.Symbol, opt => opt.MapFrom(src => src.Symbol))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => src.Purpose))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Composites, opt => opt.MapFrom(src => src.Composites))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.IsRoot, opt => opt.MapFrom(src => src.IsRoot));
        }

        private object SerializePurpose(NodeAm src)
        {
            if (src?.Purpose == null)
                return null;

            return JsonConvert.SerializeObject(src.Purpose);
        }
    }
}