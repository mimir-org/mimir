import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node, Project } from "../models";
import { useReactFlow } from "react-flow-renderer";

type Item = Node | LibItem;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (childId: string, parentId: string, project: Project) => {
  const actualParent = GetParent(childId, project);
  return actualParent?.id === parentId;
};

export const IsParentOf = (parentId: string, childId: string) => {
  const edges = useReactFlow().getEdges();
  const edge = edges?.find((e) => e.data.edge.toNode?.id === childId && e.data.edge.fromNode?.id === parentId)?.data?.edge;

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export const GetParent = (nodeId: string, project: Project) => {
  const edges = project?.edges;
  const nodes = project?.nodes;

  const parentEdge = edges?.find((e) => e.toNodeId === nodeId && IsPartOfTerminal(e.toConnector));
  const parentNode = nodes?.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? null;
};

export const GetChildren = (nodeId: string, project: Project) =>
  project?.nodes?.filter((otherNode) =>
    project?.edges?.find(
      (edge) => edge.fromNodeId === nodeId && edge.toNodeId === otherNode?.id && IsPartOfTerminal(edge.fromConnector)
    )
  );
