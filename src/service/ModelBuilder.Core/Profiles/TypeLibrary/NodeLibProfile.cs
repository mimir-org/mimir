using System.Collections.Generic;
using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mimirorg.TypeLibrary.Models.Client;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class NodeLibProfile : Profile
    {
        public NodeLibProfile()
        {
            CreateMap<AttributeLibCm, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<SimpleLibCm, Simple>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<NodeLibCm, LibraryNodeItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.StatusId, opt => opt.Ignore())
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => CreateConnectors(src)))
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.SymbolId, opt => opt.MapFrom(src => src.BlobId))
                .ForMember(dest => dest.Simples, opt => opt.MapFrom(src => src.Simples))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => new Purpose {Id = src.PurposeId, Name = src.PurposeName}))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created));



        }

        private List<Connector> CreateConnectors(NodeLibCm src)
        {
            return null;
        }
    }
}
