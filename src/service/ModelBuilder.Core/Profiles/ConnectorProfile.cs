using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class ConnectorProfile : Profile
    {
        public ConnectorProfile()
        {
            #region Connector

            CreateMap<ConnectorAm, ConnectorDm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
                .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
                .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject));

            CreateMap<ConnectorDm, ConnectorCm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Direction, opt => opt.MapFrom(src => src.Direction))
                .ForMember(dest => dest.Inside, opt => opt.MapFrom(src => src.Inside))
                .ForMember(dest => dest.Outside, opt => opt.MapFrom(src => src.Outside))
                .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
                .ForMember(dest => dest.AspectObject, opt => opt.MapFrom(src => src.AspectObject));

            #endregion Connector

            #region ConnectorTerminal

            CreateMap<ConnectorTerminalAm, ConnectorTerminalDm>()
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .ForMember(dest => dest.ReferenceType, opt => opt.MapFrom(src => src.ReferenceType))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<ConnectorAm, ConnectorDm>();

            CreateMap<ConnectorTerminalDm, ConnectorTerminalCm>()
                .ForMember(dest => dest.TerminalType, opt => opt.MapFrom(src => src.TerminalType))
                .ForMember(dest => dest.TerminalParentType, opt => opt.MapFrom(src => src.TerminalParentType))
                .ForMember(dest => dest.ReferenceType, opt => opt.MapFrom(src => src.ReferenceType))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .IncludeBase<ConnectorDm, ConnectorCm>();

            #endregion ConnectorTerminal

            #region ConnectorRelation

            CreateMap<ConnectorRelationAm, ConnectorRelationDm>()
                .IncludeBase<ConnectorAm, ConnectorDm>();

            CreateMap<ConnectorRelationDm, ConnectorRelationCm>()
                .IncludeBase<ConnectorDm, ConnectorCm>();

            #endregion ConnectorRelation

            #region ConnectorFulfilledBy

            CreateMap<ConnectorFulfilledByAm, ConnectorFulfilledByDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            CreateMap<ConnectorFulfilledByDm, ConnectorFulfilledByCm>()
                .IncludeBase<ConnectorRelationDm, ConnectorRelationCm>();

            #endregion ConnectorFulfilledBy

            #region ConnectorHasLocation

            CreateMap<ConnectorHasLocationAm, ConnectorHasLocationDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            CreateMap<ConnectorHasLocationDm, ConnectorHasLocationCm>()
                .IncludeBase<ConnectorRelationDm, ConnectorRelationCm>();

            #endregion ConnectorHasLocation

            #region ConnectorPartOf

            CreateMap<ConnectorPartOfAm, ConnectorPartOfDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            CreateMap<ConnectorPartOfDm, ConnectorPartOfCm>()
                .IncludeBase<ConnectorRelationDm, ConnectorRelationCm>();

            #endregion ConnectorPartOf
        }
    }
}