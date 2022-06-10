using Mb.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Mb.Models.Application
{
    public class RelationAm : ConnectorAm
    {
        [EnumDataType(typeof(RelationType))]
        public RelationType RelationType { get; set; }
    }
}