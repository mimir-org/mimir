import red from "store";
import { Node as FlowNode, Edge as FlowEdge, useReactFlow } from "react-flow-renderer";
import { AspectObject, Connection } from "lib";

export const GetSelectedFlowEdges = (selectedNodes: FlowNode[]): FlowEdge[] => {
  return useReactFlow()
    .getEdges()
    .filter((edge) => selectedNodes.some((n) => n.id === edge.source || n.id === edge.target));
};

export const GetSelectedFlowNodes = (): FlowNode[] => {
  return useReactFlow()
    .getNodes()
    .filter((node) => node.selected);
};

export const GetFlowNodes = () => {
  return useReactFlow().getNodes();
};

export const GetMimirNodes = (): AspectObject[] => {
  return red.store.getState().projectState?.project?.aspectObjects;
};

export const GetMimirEdges = (): Connection[] => {
  return red.store.getState().projectState?.project?.connections;
};
