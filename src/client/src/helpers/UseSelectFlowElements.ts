import { useCallback } from "react";
import { useStore } from "react-flow-renderer";

type SetFlowElementFunction = (elementId: string) => void;

export const useSelectFlowElements = (): [SetFlowElementFunction, SetFlowElementFunction] => {
  // const setSelectedElements = useStore((store) =>  state.setSelectedElements);

  // const nodes = useStore((store) => store.nodes);
  // const edges = useStore((state) => state.edges);

  // const setActiveNode = useCallback(
  // (elementId: string) => setSelectedElements(nodes.filter((ele) => ele.id === elementId)),
  // [nodes, setSelectedElements]
  // );

  // const setActiveEdge = useCallback(
  // (elementId: string) => setSelectedElements(edges.filter((ele) => ele.id === elementId)),
  // [edges, setSelectedElements]
  // );
  return null;
  // return [setActiveNode, setActiveEdge];
};
