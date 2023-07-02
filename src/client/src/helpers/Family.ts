import red from "store";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { AspectObject } from "lib";

type Item = AspectObject | AspectObjectLibCm;

export const IsFamily = (element: Item, elementToCheck: Item) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (child: AspectObject, parent: AspectObject) => {
  // return child.parentNodeId === parent.id;
};

export const IsParentOf = (parentId: string, childId: string) => {
  // const edges = red.store.getState().projectState.project.connections;
  // const edge = edges?.find((e) => e.toNode?.id === childId && e.fromNode?.id === parentId);
  // return edge && edge.IsPartOfRelation(edge.fromConnector);
};

export const GetParentNode = (childNodeId: string) => {
  // const edges = red.store.getState().projectState.project.connections;
  // const nodes = red.store.getState().projectState.project.aspectObjects;
  // const parentEdge = edges.find((e) => e.toNodeId === childNodeId && IsPartOfRelation(e.toConnector));
  // return nodes.find((n) => n.id === parentEdge?.fromNodeId);
};

export const GetSelectedNode = () => {
  const nodes = red.store.getState().projectState.project.aspectObjects;
  return nodes.find((n) => n.selected);
};
