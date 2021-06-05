import { GetTransportTypeColor, Legend } from ".";
import GetRelationshipColor from "./GetRelationshipColor";
import {
  Node,
  RELATION_TYPE,
  RelationType,
  Project,
} from "../../../../models/project";

const GetBlockViewLegend = (node: Node): Legend[] => {
  const legends = node?.connectors
    ?.filter(
      (x) => x.relationType === (RELATION_TYPE.Transport as RelationType)
    )
    .map((y) => {
      return {
        key: y.id,
        name: y.name,
        color: GetTransportTypeColor(y.terminal),
      };
    });

  return legends;
};

const GetTreeViewLegend = (node: Node): Legend[] => {
  const legends = node?.connectors
    ?.filter(
      (x) =>
        x.relationType === (RELATION_TYPE.PartOf as RelationType) ||
        x.relationType === (RELATION_TYPE.HasLocation as RelationType) ||
        x.relationType === (RELATION_TYPE.FulfilledBy as RelationType)
    )
    .map((y) => {
      const [name, color] = GetRelationshipColor(y.relationType, node.type);
      return {
        key: y.id,
        name: name,
        color: color,
      };
    });

  return legends;
};

const GetBlockViewNodes = (project: Project, nodeId: string): Node[] => {
  const nodes = [] as Node[];
  const fromNode = project?.nodes?.find((x) => x.id === nodeId);

  project?.edges?.forEach((edge) => {
    if (edge.fromNode === nodeId) {
      const currentConnector = fromNode.connectors.find(
        (x) => x.id === edge.fromConnector
      );
      if (currentConnector?.relationType === RELATION_TYPE.PartOf) {
        const toNode = project.nodes?.find((x) => x.id === edge.toNode);
        if (!toNode?.isHidden) nodes.push(toNode);
      }
    }
  });

  return nodes;
};

const GetTreeviewNodes = (project: Project): Node[] => {
  return project.nodes?.filter((x) => !x?.isHidden);
};

const GetLegendData = (
  project: Project,
  isBlockView: boolean,
  nodeId: string
) => {
  const legends = [] as Legend[];

  if (!project) return legends;

  if (isBlockView) {
    const nodes = GetBlockViewNodes(project, nodeId);
    nodes?.forEach((node) => {
      legends.push.apply(legends, GetBlockViewLegend(node));
    });
    return legends.filter(
      (value, index, self) =>
        self.map((x) => x.color).indexOf(value.color) === index
    );
  } else {
    const nodes = GetTreeviewNodes(project);
    nodes?.forEach((node) => {
      legends.push.apply(legends, GetTreeViewLegend(node));
    });
    return legends.filter(
      (value, index, self) =>
        self.map((x) => x.name + x.color).indexOf(value.name + value.color) ===
        index
    );
  }
};

export default GetLegendData;
