using System;
using System.Threading.Tasks;
using Mb.Models.Data;
using Mb.Models.Enums;
using Mimirorg.TypeLibrary.Enums;

namespace Mb.Models.Extensions
{
    public static class RelationExtensions
    {
        public static async Task<Connector> CreateRelationConnector(this RelationType relationType, ConnectorDirection connectorType)
        {
            var name = string.Empty;

            switch (relationType)
            {
                case RelationType.NotSet:
                    name = "Not set";
                    break;
                case RelationType.PartOf:
                    name = "Part of Relationship";
                    break;
                case RelationType.HasLocation:
                    name = "Has Location";
                    break;
                case RelationType.FulfilledBy:
                    name = "Fulfilled By";
                    break;
            }

            var relation = new ConnectorRelation
            {
                Id = Guid.NewGuid().ToString().ToLower(),
                Name = name,
                Direction = connectorType,
                AspectObjectId = null,
                AspectObject = null
            };

            return await Task.Run(() => relation);
        }
    }
}