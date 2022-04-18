import { useReactFlow } from "react-flow-renderer";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node, Project } from "../models";

type Item = Node | LibItem;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (child: Node, parent: Node) => {
  const isFamily = IsFamily(child, parent);
  const isDirectChild = parent.level === child.level - 1;
  return isFamily && isDirectChild;
};

export const IsParentOf = (parentId: string, childId: string) => {
  const edges = useReactFlow().getEdges();
  const edge = edges?.find((e) => e.data.edge.toNode?.id === childId && e.data.edge.fromNode?.id === parentId)?.data?.edge;

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export const GetParentNode = (childNodeId: string, project: Project) => {
  const edges = project?.edges;
  const nodes = project?.nodes;

  const parentEdge = edges?.find((e) => e.toNodeId === childNodeId && IsPartOfTerminal(e.toConnector));

  return nodes?.find((n) => n.id === parentEdge?.fromNodeId);
};
