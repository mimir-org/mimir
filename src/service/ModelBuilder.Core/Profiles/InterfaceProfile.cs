using System;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Microsoft.AspNetCore.Http;
using Mimirorg.Common.Extensions;
using Newtonsoft.Json;

namespace Mb.Core.Profiles
{
    public class InterfaceProfile : Profile
    {
        public InterfaceProfile(IHttpContextAccessor contextAccessor)
        {
            CreateMap<InterfaceAm, Interface>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.TypeReferenceString, opt => opt.MapFrom(src => src.TypeReferences != null ? JsonConvert.SerializeObject(src.TypeReferences) : null))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => src.InputTerminalId))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => src.OutputTerminalId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.UpdatedBy) ? contextAccessor.GetName() : src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated ?? DateTime.Now.ToUniversalTime()))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.LibraryTypeId, opt => opt.MapFrom(src => src.LibraryTypeId))
                .ForMember(dest => dest.Edges, opt => opt.Ignore());

            CreateMap<Interface, InterfaceAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.TypeReferences, opt => opt.MapFrom(src => src.TypeReferences))
                .ForMember(dest => dest.InputTerminal, opt => opt.MapFrom(src => src.InputTerminal))
                .ForMember(dest => dest.InputTerminalId, opt => opt.MapFrom(src => src.InputTerminalId))
                .ForMember(dest => dest.OutputTerminal, opt => opt.MapFrom(src => src.OutputTerminal))
                .ForMember(dest => dest.OutputTerminalId, opt => opt.MapFrom(src => src.OutputTerminalId))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.LibraryTypeId, opt => opt.MapFrom(src => src.LibraryTypeId));
        }
    }
}