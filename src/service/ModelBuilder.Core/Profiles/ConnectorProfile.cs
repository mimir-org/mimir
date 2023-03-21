using AutoMapper;
using Mb.Models.Application;
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

            #endregion ConnectorTerminal

            #region ConnectorRelation

            CreateMap<ConnectorRelationAm, ConnectorRelationDm>()
                .IncludeBase<ConnectorAm, ConnectorDm>();

            #endregion ConnectorRelation

            #region ConnectorFulfilledBy

            CreateMap<ConnectorFulfilledByAm, ConnectorFulfilledByDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            #endregion ConnectorFulfilledBy

            #region ConnectorHasLocation

            CreateMap<ConnectorHasLocationAm, ConnectorHasLocationDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            #endregion ConnectorHasLocation

            #region ConnectorPartOf

            CreateMap<ConnectorPartOfAm, ConnectorPartOfDm>()
                .IncludeBase<ConnectorRelationAm, ConnectorRelationDm>();

            #endregion ConnectorPartOf
        }
    }
}