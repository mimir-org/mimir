using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectionProfile : Profile
    {
        public ConnectionProfile()
        {
            #region Connection
            
            CreateMap<ConnectionAm, ConnectionDm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project));

            CreateMap<ConnectionDm, ConnectionCm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FromConnector, opt => opt.MapFrom(src => src.FromConnector))
                .ForMember(dest => dest.ToConnector, opt => opt.MapFrom(src => src.ToConnector))
                .ForMember(dest => dest.MainProject, opt => opt.MapFrom(src => src.MainProject))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project));

            #endregion Connection

            #region ConnectionTerminal

            CreateMap<ConnectionTerminalAm, ConnectionTerminalDm>()
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .IncludeBase<ConnectionAm, ConnectionDm>();

            CreateMap<ConnectionTerminalDm, ConnectionTerminalCm>()
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .IncludeBase<ConnectionDm, ConnectionCm>();

            #endregion ConnectionTerminal

            #region ConnectionRelation

            CreateMap<ConnectionRelationAm, ConnectionRelationDm>()
                .IncludeBase<ConnectionAm, ConnectionDm>();

            CreateMap<ConnectionRelationDm, ConnectionRelationCm>()
                .IncludeBase<ConnectionDm, ConnectionCm>();

            #endregion ConnectionRelation

            #region ConnectionFulfilledBy

            CreateMap<ConnectionFulfilledByAm, ConnectionFulfilledByDm>()
                .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

            CreateMap<ConnectionFulfilledByDm, ConnectionFulfilledByCm>()
                .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

            #endregion ConnectionFulfilledBy

            #region ConnectionHasLocation

            CreateMap<ConnectionHasLocationAm, ConnectionHasLocationDm>()
                .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

            CreateMap<ConnectionHasLocationDm, ConnectionHasLocationCm>()
                .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

            #endregion ConnectionHasLocation

            #region ConnectionPartOf

            CreateMap<ConnectionPartOfAm, ConnectionPartOfDm>()
                .IncludeBase<ConnectionRelationAm, ConnectionRelationDm>();

            CreateMap<ConnectionPartOfDm, ConnectionPartOfCm>()
                .IncludeBase<ConnectionRelationDm, ConnectionRelationCm>();

            #endregion ConnectionPartOf
        }
    }
}