using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Mb.Core.Extensions;
using Mb.Core.Repositories.Contracts;
using Mb.Models.Application;
using Mb.Models.Data;

namespace Mb.Core.Profiles
{
    public class LibraryTypeProfile : Profile
    {
        public LibraryTypeProfile(ICommonRepository commonRepository)
        {
            CreateMap<CreateLibraryType, NodeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.TerminalTypes, opt => opt.MapFrom(src => CreateTerminalTypes(src.TerminalTypes.ToList(), $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()).ToList()))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()));

            CreateMap<CreateLibraryType, TransportType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId))
                .ForMember(dest => dest.AttributeTypes, opt => opt.MapFrom(src => CreateAttributeTypes(src.AttributeTypes.ToList()).ToList()));

            CreateMap<CreateLibraryType, InterfaceType>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(src => $"{src.Key}-{commonRepository.GetDomain()}".CreateMd5()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.MapFrom(src => src.TerminalTypeId));
        }

        private static IEnumerable<NodeTypeTerminalType> CreateTerminalTypes(IReadOnlyCollection<TerminalTypeItem> terminalTypes, string nodeId)
        {
            if (terminalTypes == null || !terminalTypes.Any())
                yield break;

            foreach (var item in terminalTypes)
            {
                yield return new NodeTypeTerminalType
                {
                    Id = item.Key.CreateMd5(),
                    NodeTypeId = nodeId,
                    TerminalTypeId = item.TerminalTypeId,
                    Number = item.Number,
                    ConnectorType = item.ConnectorType
                };
            }
        }

        private static IEnumerable<AttributeType> CreateAttributeTypes(IReadOnlyCollection<string> attributeTypes)
        {
            if (attributeTypes == null || !attributeTypes.Any())
                yield break;

            foreach (var item in attributeTypes)
                yield return new AttributeType
                {
                    Id = item
                };
        }
    }
}
