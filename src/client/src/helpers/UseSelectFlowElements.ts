import { useCallback } from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";

type SetFlowElementFunction = (elementId: string) => void;

export const useSelectFlowElements = (): [SetFlowElementFunction, SetFlowElementFunction] => {
  const setSelectedElements = useStoreActions((state) => state.setSelectedElements);

  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);

  const setActiveNode = useCallback(
    (elementId: string) => setSelectedElements(nodes.filter((ele) => ele.id === elementId)),
    [nodes, setSelectedElements]
  );

  const setActiveEdge = useCallback(
    (elementId: string) => setSelectedElements(edges.filter((ele) => ele.id === elementId)),
    [edges, setSelectedElements]
  );

  return [setActiveNode, setActiveEdge];
};
