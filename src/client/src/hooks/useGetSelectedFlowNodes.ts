import { Node, Edge, useReactFlow } from "react-flow-renderer";

export const useGetSelectedFlowNodes = (): Node[] => {
  return useReactFlow()
    .getNodes()
    .filter((node) => node.selected);
};

export const useGetSelectedFlowEdges = (selectedNodes: Node[]): Edge[] => {
  return useReactFlow()
    .getEdges()
    .filter((edge) => selectedNodes.some((n) => n.id === edge.source || n.id === edge.target));
};

export const useGetFlowNodes = () => {
  return useReactFlow().getNodes();
};
