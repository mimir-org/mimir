using System.Linq;
using AutoMapper;
using Mb.Data.Contracts;
using Mb.Models.Application;
using Mb.Models.Application.TypeEditor;
using Mb.Models.Data;
using Mb.Models.Data.Enums;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;
using Attribute = Mb.Models.Data.Attribute;

namespace Mb.Core.Profiles
{
    public class AttributeProfile : Profile
    {
        public AttributeProfile(ICommonRepository commonRepository)
        {
            CreateMap<CreateAttributeType, AttributeType>()
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
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()));

            CreateMap<AttributeType, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateUniqueId()))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Entity))
                .ForMember(dest => dest.Value, opt => opt.UseDestinationValue())
                .ForMember(dest => dest.SelectedUnitId, opt => opt.Ignore())
                .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.QualifierId))
                .ForMember(dest => dest.Qualifier, opt => opt.MapFrom(src => src.Qualifier))
                .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.SourceId))
                .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source))
                .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.ConditionId))
                .ForMember(dest => dest.Condition, opt => opt.MapFrom(src => src.Condition))
                .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.FormatId))
                .ForMember(dest => dest.Format, opt => opt.MapFrom(src => src.Format))
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.TerminalId, opt => opt.Ignore())
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.Ignore())
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValuesString))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags));

            CreateMap<AttributeAm, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
                .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
                .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
                .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
                .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.QualifierId))
                .ForMember(dest => dest.Qualifier, opt => opt.Ignore())
                .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.SourceId))
                .ForMember(dest => dest.Source, opt => opt.Ignore())
                .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.ConditionId))
                .ForMember(dest => dest.Condition, opt => opt.Ignore())
                .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.FormatId))
                .ForMember(dest => dest.Format, opt => opt.Ignore())
                .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.Units))
                .ForMember(dest => dest.TerminalId, opt => opt.MapFrom(src => src.TerminalId))
                .ForMember(dest => dest.Terminal, opt => opt.Ignore())
                .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
                .ForMember(dest => dest.Node, opt => opt.Ignore())
                .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
                .ForMember(dest => dest.IsLockedBy, opt => opt.MapFrom(src => src.IsLockedBy))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(src => src.SelectType))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(src => src.Discipline))
                .ForMember(dest => dest.SelectValues, opt => opt.MapFrom(src => src.SelectValues))
                .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
                .ForMember(dest => dest.CompositeId, opt => opt.MapFrom(src => src.CompositeId))
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()));

            CreateMap<Attribute, AttributeAm>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => commonRepository.CreateOrUseId(src.Id)))
               .ForMember(dest => dest.Key, opt => opt.MapFrom(src => src.Key))
               .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value))
               .ForMember(dest => dest.SemanticReference, opt => opt.MapFrom(src => src.SemanticReference))
               .ForMember(dest => dest.SelectedUnitId, opt => opt.MapFrom(src => src.SelectedUnitId))
               .ForMember(dest => dest.AttributeTypeId, opt => opt.MapFrom(src => src.AttributeTypeId))
               .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
               .ForMember(dest => dest.IsLockedBy, opt => opt.MapFrom(src => src.IsLockedBy))
               .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.QualifierId))
               .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.SourceId))
               .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.ConditionId))
               .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.FormatId))
               .ForMember(dest => dest.NodeId, opt => opt.MapFrom(src => src.NodeId))
               .ForMember(dest => dest.TransportId, opt => opt.MapFrom(src => src.TransportId))
               .ForMember(dest => dest.CompositeId, opt => opt.MapFrom(src => src.CompositeId))
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