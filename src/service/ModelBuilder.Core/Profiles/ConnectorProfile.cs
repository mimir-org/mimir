﻿using AutoMapper;
using Mb.Core.Models;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectorProfile : Profile
    {
        public ConnectorProfile()
        {
            CreateMap<ConnectorAm, Connector>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.TerminalCategory))
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.RelationType))
                .ForMember(dest => dest.Node, opt => opt.Ignore());

            CreateMap<Connector, ConnectorAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalCategory, opt => opt.MapFrom(src => src.TerminalCategory))
                .ForMember(dest => dest.RelationType, opt => opt.MapFrom(src => src.RelationType))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .PreserveReferences();

        }
    }
}