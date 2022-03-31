import { useCallback, useMemo } from "react";
import { useStore, useReactFlow } from "react-flow-renderer";

type SetFlowElementFunction = (elementId: string) => void;

export const useSelectFlowElements = (): [SetFlowElementFunction, SetFlowElementFunction] => {
  const setSelectedNodes = useStore().addSelectedNodes;
  const setSelectedEdges = useStore().addSelectedEdges;

  const nodes = useReactFlow().getNodes();
  const edges = useReactFlow().getEdges();

  const nodeIds: string[] = useMemo(() => [], []);
  const edgeIds: string[] = useMemo(() => [], []);

  nodes.forEach((n) => {
    nodeIds.push(n.id);
  });

  edges.forEach((e) => {
    edgeIds.push(e.id);
  });

  const setActiveNode = useCallback(() => setSelectedNodes(nodeIds), [nodeIds, setSelectedNodes]);
  const setActiveEdge = useCallback(() => setSelectedEdges(edgeIds), [edgeIds, setSelectedEdges]);

  return [setActiveNode, setActiveEdge];
};
