using System.Linq;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;
using Newtonsoft.Json;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile(ICommonRepository commonRepository)
        {
            CreateMap<AttributeTypeAm, AttributeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Key.CreateMd5()))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.QualifierId))
                .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.SourceId))
                .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.ConditionId))
                .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.FormatId))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.ConvertToObject))
                .ForMember(dest => dest.SelectValues, opt => opt.Ignore())
                .ForMember(dest => dest.SelectValuesString,
                    opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()));

            // TODO: We should not map objects from AttributeType to Attribute??
            CreateMap<AttributeType, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateId()))
                .ForMember(dest => dest.Iri, opt => opt.Ignore())
                .ForMember(dest => dest.Domain, opt => opt.Ignore())
                .ForMember(dest => dest.Kind, opt => opt.Ignore())
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.SelectedUnitId, opt => opt.Ignore())
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier.Name))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source.Name))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition.Name))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format.Name))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AttributeTypeIri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.TerminalId, opt => opt.Ignore())
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.SelectValues, opt => opt.Ignore())
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValuesString))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags));

            CreateMap<AttributeAm, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.AttributeTypeIri, opt => opt.MapFrom(src => src.AttributeTypeIri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.UnitString,
                    opt => opt.MapFrom(src => src.Units != null ? JsonConvert.SerializeObject(src.Units) : null))
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.TerminalIri, opt => opt.MapFrom(src => src.TerminalIri))
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.Interface, opt => opt.Ignore())
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.InterfaceId))
                .ForMember(dest => dest.InterfaceIri, opt => opt.MapFrom(src => src.InterfaceIri))
                .ForMember(dest => dest.Transport, opt => opt.Ignore())
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.TransportIri, opt => opt.MapFrom(src => src.TransportIri))
                .ForMember(dest => dest.Simple, opt => opt.Ignore())
                .ForMember(dest => dest.SimpleId, opt => opt.MapFrom(src => src.SimpleId))
                .ForMember(dest => dest.SimpleIri, opt => opt.MapFrom(src => src.SimpleIri))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.SelectValues, opt => opt.Ignore())
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
                .ForMember(dest => dest.SelectValuesString,
                    opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()));

            CreateMap<Attribute, AttributeAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Iri, opt => opt.MapFrom(src => src.Iri))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.AttributeTypeIri, opt => opt.MapFrom(src => src.AttributeTypeIri))
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
                .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.NodeIri, opt => opt.MapFrom(src => src.NodeIri))
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.TransportIri, opt => opt.MapFrom(src => src.TransportIri))
                .ForMember(dest => dest.InterfaceId, opt => opt.MapFrom(src => src.InterfaceId))
                .ForMember(dest => dest.InterfaceIri, opt => opt.MapFrom(src => src.InterfaceIri))
                .ForMember(dest => dest.SimpleId, opt => opt.MapFrom(src => src.SimpleId))
                .ForMember(dest => dest.SimpleIri, opt => opt.MapFrom(src => src.SimpleIri))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.SelectValues, opt => opt.MapFrom(src => src.SelectValues))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline));

            CreateMap<UnitAm, Unit>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference));

            CreateMap<Unit, UnitAm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference));

            CreateMap<PredefinedAttribute, PredefinedAttributeAm>()
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Values, opt => opt.MapFrom(src => src.Values.ToDictionary(x => x, x => false)))
                .ForMember(dest => dest.IsMultiSelect, opt => opt.MapFrom(src => src.IsMultiSelect));
        }
    }
}