import red from "../redux/store/index";
import { IsPartOfRelation } from "../components/flow/helpers/Connectors";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Node } from "@mimirorg/modelbuilder-types";

type Item = Node | NodeLibCm;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (child: Node, parent: Node) => {
  return child.parentNodeId === parent.id;
};

export const IsParentOf = (parentId: string, childId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const edge = edges?.find((e) => e.toNode?.id === childId && e.fromNode?.id === parentId);

  return edge && IsPartOfRelation(edge.fromConnector);
};

export const GetParentNode = (childNodeId: string) => {
  const edges = red.store.getState().projectState.project.edges;
  const nodes = red.store.getState().projectState.project.nodes;

  const parentEdge = edges.find((e) => e.toNodeId === childNodeId && IsPartOfRelation(e.toConnector));
  return nodes.find((n) => n.id === parentEdge?.fromNodeId);
};

export const GetSelectedNode = () => {
  const nodes = red.store.getState().projectState.project.nodes;
  return nodes.find((n) => n.selected);
};
