using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles;

public class ConnectorProfile : Profile
{
    public ConnectorProfile()
    {

        CreateMap<ConnectorRequest, Connector>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
            .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
            .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
            .ForMember(dest => dest.BlockId, opt => opt.MapFrom(src => src.BlockId));

        CreateMap<Connector, ConnectorResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
            .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
            .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
            .ForMember(dest => dest.BlockId, opt => opt.MapFrom(src => src.BlockId))
            .ForMember(dest => dest.Domain, opt => opt.Ignore());

        CreateMap<Connector, ConnectorRequest>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
            .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
            .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
            .ForMember(dest => dest.BlockId, opt => opt.MapFrom(src => src.BlockId));


        CreateMap<ConnectorRequest, Connector>()
            .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
            .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
            .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
            .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
            ;
    }
}