import red from "../redux/store/index";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node } from "../models";

type Item = Node | LibItem;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (child: Node, parent: Node) => {
  return child.parentNodeId === parent.id;
};

export const IsParentOf = (parentId: string, childId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const edge = edges?.find((e) => e.toNode?.id === childId && e.fromNode?.id === parentId);

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export const GetParentNode = (childNodeId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const parentEdge = edges.find((e) => e.toNodeId === childNodeId && IsPartOfTerminal(e.toConnector));
  return nodes.find((n) => n.id === parentEdge?.fromNodeId);
};

export const GetSelectedNode = () => {
  return red.store.getState().projectState.project.nodes.find((n) => n.selected);
};
