using AutoMapper;
using Mb.Models.Data.TypeEditor;
using Mb.Models.Extensions;
using Mimirorg.TypeLibrary.Models.Client;

namespace Mb.Core.Profiles.TypeLibrary
{
    public class AttributeLibProfile : Profile
    {
        public AttributeLibProfile()
        {
            CreateMap<AttributeLibCm, AttributeType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
                .ForMember(dest => dest.Iri, opt => opt.Ignore())

                .ForMember(dest => dest.QualifierId, opt => opt.MapFrom(src => src.AttributeQualifier))
                .ForMember(dest => dest.Qualifier, opt => opt.Ignore())
                .ForMember(dest => dest.SourceId, opt => opt.MapFrom(src => src.AttributeSource))
                .ForMember(dest => dest.Source, opt => opt.Ignore())
                .ForMember(dest => dest.ConditionId, opt => opt.MapFrom(src => src.AttributeCondition))
                .ForMember(dest => dest.Condition, opt => opt.Ignore())
                .ForMember(dest => dest.FormatId, opt => opt.MapFrom(src => src.AttributeFormat))
                .ForMember(dest => dest.Format, opt => opt.Ignore())

                .ForMember(dest => dest.Units, opt => opt.MapFrom(x => x.Units))
                .ForMember(dest => dest.Tags, opt => opt.Ignore())
                .ForMember(dest => dest.SelectValues, opt => opt.Ignore())
                .ForMember(dest => dest.SelectValuesString, opt => opt.MapFrom(src => src.SelectValues == null ? null : src.SelectValues.ConvertToString()))
                .ForMember(dest => dest.SelectType, opt => opt.MapFrom(x => x.Select))
                .ForMember(dest => dest.Discipline, opt => opt.MapFrom(x => x.Discipline))
                .ForMember(dest => dest.Description, opt => opt.Ignore())

                .ForMember(dest => dest.TerminalTypes, opt => opt.Ignore())
                .ForMember(dest => dest.NodeTypes, opt => opt.Ignore())
                .ForMember(dest => dest.TransportTypes, opt => opt.Ignore())
                .ForMember(dest => dest.SimpleTypes, opt => opt.Ignore());
        }
    }
}
