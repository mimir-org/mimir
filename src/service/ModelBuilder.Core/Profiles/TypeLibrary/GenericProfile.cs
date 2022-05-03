using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class GenericProfile : Profile
    {
        public GenericProfile()
        {
            CreateMap<RdsLibCm, Rds>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri));

            CreateMap<SimpleLibCm, Simple>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            
            CreateMap<TransportLibCm, LibraryTransportItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Version, opt => opt.MapFrom(src => src.Version))
                .ForMember(dest => dest.RdsId, opt => opt.MapFrom(src => src.RdsId))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.StatusId, opt => opt.Ignore())
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.TerminalTypeId, opt => opt.Ignore())
                .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes))
                .ForMember(dest => dest.Purpose, opt => opt.MapFrom(src => new Purpose{Id = src.PurposeId, Name = src.Name}))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created));

            CreateMap<AttributeQualifierLibCm, AttributeQualifier>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore());

            CreateMap<AttributeSourceLibCm, AttributeSource>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore());

            CreateMap<AttributeFormatLibCm, AttributeFormat>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore());

            CreateMap<AttributeConditionLibCm, AttributeCondition>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore());

            CreateMap<PurposeLibCm, Purpose>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline));

            CreateMap<UnitLibCm, Unit>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => Aspect.None))
                .ForMember(dest => dest.ParentId, opt => opt.Ignore())
                .ForMember(dest => dest.Parent, opt => opt.Ignore())
                .ForMember(dest => dest.Children, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore());

            CreateMap<AttributeAspectLibCm, LocationTypeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.Ignore())
                .ForMember(dest => dest.LocationSubTypes, opt => opt.MapFrom(src => src.Children));
        }
    }
}