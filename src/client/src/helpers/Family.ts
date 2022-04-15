import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node, Project } from "../models";
import { useReactFlow } from "react-flow-renderer";

type Item = Node | LibItem;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (childId: string, parentId: string, project: Project) => {
  return GetParentNode(childId, project)?.id === parentId;
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
