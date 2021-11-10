﻿using System;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Services.Extensions;
using Microsoft.AspNetCore.Http;

namespace Mb.Core.Profiles
{
    public class TransportProfile : Profile
    {
        public TransportProfile(IHttpContextAccessor contextAccessor, ICommonRepository commonRepository)
        {
            CreateMap<TransportAm, Transport>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
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

            CreateMap<Transport, TransportAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.Rds, opt => opt.MapFrom(src => src.Rds))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Label))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
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