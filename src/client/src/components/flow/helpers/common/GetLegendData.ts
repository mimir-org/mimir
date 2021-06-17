import GetRelationshipColor from "./GetRelationshipColor";
import { Node, Project } from "../../../../models";
import {
  GetTransportTypeColor,
  IsFulfilledByTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
  Legend,
} from ".";

const GetBlockViewLegend = (node: Node): Legend[] => {
  const legends = node?.connectors
    ?.filter((x) => IsTransportTerminal(x))
    .map((y) => {
      return {
        key: y.id,
        name: y.name,
        color: GetTransportTypeColor(),
      };
    });

  return legends;
};

const GetTreeViewLegend = (node: Node): Legend[] => {
  const legends = node?.connectors
    ?.filter(
      (x) =>
        IsPartOfTerminal(x) || IsLocationTerminal(x) || IsFulfilledByTerminal(x)
    )
    .map((y) => {
      const [name, color] = GetRelationshipColor(y, node);
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
    if (edge.fromNodeId === nodeId) {
      const currentConnector = edge.fromConnector;

      if (IsPartOfTerminal(currentConnector)) {
        const toNode = project.nodes?.find((node) => node === edge.toNode);
        if (!toNode?.isHidden) nodes.push(toNode);
      }
    }
  });

  return nodes;
};

const GetTreeviewNodes = (project: Project): Node[] => {
  return project?.nodes?.filter((x) => !x?.isHidden);
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
