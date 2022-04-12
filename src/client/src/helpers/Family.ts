import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node } from "../models";
import { useReactFlow } from "react-flow-renderer";

type Item = Node | LibItem;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (childParentId: string, parentId: string) => {
  return childParentId === parentId;
};

export const IsParentOf = (parentId: string, childId: string) => {
  const edges = useReactFlow().getEdges();
  const edge = edges?.find((e) => e.data.edge.toNode?.id === childId && e.data.edge.fromNode?.id === parentId)?.data?.edge;

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export const GetParentNode = (parentNodeId: string, nodes: Node[]) => {
  const parentNode = nodes.find((n) => n.id === parentNodeId);

  return parentNode ?? null;
};
