import red from "../redux/store";
import { Node as FlowNode, Edge as FlowEdge, useReactFlow } from "react-flow-renderer";
import { Edge, Node } from "@mimirorg/modelbuilder-types";

export const GetSelectedFlowEdges = (): FlowEdge[] => {
  return useReactFlow()
    .getEdges()
    .filter((edge) => edge.selected);
};

export const GetSelectedFlowNodes = (): FlowNode[] => {
  return useReactFlow()
    .getNodes()
    .filter((node) => node.selected);
};

export const GetFlowNodes = () => {
  return useReactFlow().getNodes();
};

export const GetMimirNodes = (): Node[] => {
  return red.store.getState().projectState?.project?.nodes;
};

export const GetMimirEdges = (): Edge[] => {
  return red.store.getState().projectState?.project?.edges;
};
