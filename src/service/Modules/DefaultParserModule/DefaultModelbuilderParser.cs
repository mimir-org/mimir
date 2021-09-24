using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mb.Models.Application;
using Mb.Models.Data;
using Mb.Models.Modules;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace DefaultParserModule
{
    public class DefaultModelBuilderParser : IModelBuilderParser
    {
        public string GetName()
        {
            return "Default";
        }

        public FileFormat GetFileFormat()
        {
            return FileFormat.Json;
        }


        public Task<byte[]> SerializeProject(Project project)
        {
            var serializerSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var projectAm = ParseProject(project);

            serializerSettings.Converters.Add(new StringEnumConverter());
            var result = JsonConvert.SerializeObject(projectAm, serializerSettings);
            return Task.FromResult(Encoding.UTF8.GetBytes(result));
        }

        public Task<Project> DeserializeProject(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = JsonConvert.DeserializeObject<Project>(valueAsString);
            return Task.FromResult(project);
        }

        public Task<ProjectAm> DeserializeProjectAm(byte[] data)
        {
            var valueAsString = Encoding.UTF8.GetString(data, 0, data.Length);
            var project = JsonConvert.DeserializeObject<ProjectAm>(valueAsString);
            return Task.FromResult(project);
        }

        private ProjectAm ParseProject(Project project)
        {
            var p = new ProjectAm
            {
                Id = project.Id,
                Name = project.Name,
                Version = project.Version,
                Description = project.Description,
                Nodes = project.Nodes?.Select(ParseNode).ToList(),
                Edges = project.Edges?.Select(ParseEdge).ToList(),
            };

            return p;
        }

        private static EdgeAm ParseEdge(Edge edge)
        {
            var e = new EdgeAm
            {
                Id = edge.Id,
                FromConnectorId = edge.FromConnectorId,
                ToConnectorId = edge.ToConnectorId,
                FromNodeId = edge.FromNodeId,
                ToNodeId = edge.ToNodeId,
                MasterProjectId = edge.MasterProjectId,
                IsTemplateEdge = edge.IsTemplateEdge
            };

            return e;
        }

        private static NodeAm ParseNode(Node node)
        {
            var n = new NodeAm
            {
                Id = node.Id,
                Name = node.Name,
                Version = node.Version,
                Label = node.Label,
                Rds = node.Rds,
                Contractor = node.Contractor,
                SemanticReference = node.SemanticReference,
                TagNumber = node.TagNumber,
                Description = node.Description,
                PositionX = node.PositionX,
                PositionY = node.PositionY,
                PositionBlockX = node.PositionBlockX,
                PositionBlockY = node.PositionBlockY,
                StatusId = node.StatusId,
                MasterProjectId = node.MasterProjectId,
                Connectors = node.Connectors?.Select(ParseConnector).ToList(),
                Attributes = node.Attributes?.Select(ParseAttribute).ToList(),
                Aspect = node.Aspect,
                IsRoot = node.IsRoot
            };

            return n;
        }

        private static ConnectorAm ParseConnector(Connector connector)
        {
            var c = new ConnectorAm
            {
                Id = connector.Id,
                Name = connector.Name,
                Type = connector.Type,
                SemanticReference = connector.SemanticReference,
                Visible = connector.Visible,
                NodeId = connector.NodeId
            };

            switch (connector)
            {
                case Terminal terminal:
                    c.Color = terminal.Color;
                    c.TerminalCategoryId = terminal.TerminalCategoryId;
                    c.Attributes = terminal.Attributes?.Select(ParseAttribute).ToList();
                    break;
                case Relation relation:
                    c.RelationType = relation.RelationType;
                    break;
            }

            return c;
        }

        private static AttributeAm ParseAttribute(Attribute attribute)
        {
            var a = new AttributeAm
            {
                Id = attribute.Id,
                Key = attribute.Key,
                Value = attribute.Value,
                SelectedUnitId = attribute.SelectedUnitId,
                QualifierId = attribute.QualifierId,
                SourceId = attribute.SourceId,
                ConditionId = attribute.ConditionId,
                FormatId = attribute.FormatId,
                TerminalId = attribute.TerminalId,
                NodeId = attribute.NodeId,
                AttributeTypeId = attribute.AttributeTypeId
            };

            return a;
        }
    }
}
