using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Core.Profiles;

public class ConnectionProfile : Profile
{
    public ConnectionProfile()
    {
        #region Connection

        CreateMap<ConnectionAm, Connection>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
            .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
            .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
            .ForMember(dest => dest.Handles, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Handles)));

        CreateMap<Connection, ConnectionCm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
            .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
            .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
            .ForMember(dest => dest.Handles, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<HandleCm>(src.Handles)));

        CreateMap<Connection, ConnectionAm>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
            .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
            .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
            .ForMember(dest => dest.Handles, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<HandleAm>(src.Handles)));

        #endregion Connection

        #region ConnectionTerminal

        CreateMap<ConnectionTerminalAm, ConnectionTerminalDm>()
            .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
            .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
            .IncludeBase<ConnectionAm, Connection>();

        CreateMap<ConnectionTerminalDm, ConnectionTerminalCm>()
            .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
            .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
            .IncludeBase<Connection, ConnectionCm>();

        CreateMap<ConnectionTerminalDm, ConnectionTerminalAm>()
            .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
            .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
            .IncludeBase<Connection, ConnectionAm>();

        #endregion ConnectionTerminal

        #region ConnectionRelation

        CreateMap<ConnectionRelationAm, ConnectionRelationDm>()
            .IncludeBase<ConnectionAm, Connection>();

        CreateMap<ConnectionRelationDm, ConnectionRelationCm>()
            .IncludeBase<Connection, ConnectionCm>();

        CreateMap<ConnectionRelationDm, ConnectionRelationAm>()
            .IncludeBase<Connection, ConnectionAm>();

        #endregion ConnectionRelation

        #region ConnectionFulfilledBy

        CreateMap<ConnectionFulfilledByAm, ConnectionFulfilledByDm>()
            .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

        CreateMap<ConnectionFulfilledByDm, ConnectionFulfilledByCm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

        CreateMap<ConnectionFulfilledByDm, ConnectionFulfilledByAm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationAm>();

        #endregion ConnectionFulfilledBy

        #region ConnectionHasLocation

        CreateMap<ConnectionHasLocationAm, ConnectionHasLocationDm>()
            .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

        CreateMap<ConnectionHasLocationDm, ConnectionHasLocationCm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

        CreateMap<ConnectionHasLocationDm, ConnectionHasLocationAm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationAm>();

        #endregion ConnectionHasLocation

        #region ConnectionPartOf

        CreateMap<ConnectionPartOfAm, ConnectionPartOfDm>()
            .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

        CreateMap<ConnectionPartOfDm, ConnectionPartOfCm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

        CreateMap<ConnectionPartOfDm, ConnectionPartOfAm>()
            .IncludeBase<ConnectionRelationDm, ConnectionRelationAm>();

        #endregion ConnectionPartOf
    }
}