import { useCallback } from "react";
import { useStore, useReactFlow } from "react-flow-renderer";

type SetFlowElementFunction = (elementId: string) => void;

export const useSelectFlowElements = (): [SetFlowElementFunction, SetFlowElementFunction] => {
  const setSelectedNodes = useStore().addSelectedNodes; //  useStore((store) =>  state.setSelectedElements);
  const setSelectedEdges = useStore().addSelectedEdges; //  useStore((store) =>  state.setSelectedElements);

  const nodes = useReactFlow().getNodes();
  const edges = useReactFlow().getEdges();

  const nodeIds: string[] = [];
  const edgeIds: string[] = [];

  nodes.forEach((n) => {
    nodeIds.push(n.id);
  });

  edges.forEach((e) => {
    edgeIds.push(e.id);
  });

  const setActiveNode = useCallback(
    (elementId: string) => setSelectedNodes(nodeIds.filter((id) => id === elementId)),
    [nodeIds, setSelectedNodes]
  );

  const setActiveEdge = useCallback(
    (elementId: string) => setSelectedEdges(edgeIds.filter((id) => id === elementId)),
    [edgeIds, setSelectedEdges]
  );

  return [setActiveNode, setActiveEdge];
};
