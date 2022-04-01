import { useReactFlow, useStore } from "react-flow-renderer";
import { useCallback } from "react";

export type SetFlowNodeFunction = (mimirNodesIds: string[]) => void;

export const UseSetSelectNodes = (): [SetFlowNodeFunction] => {
  const setSelectedNodes = useStore().addSelectedNodes;
  const flowNodes = useReactFlow().getNodes();

  const setActiveNodes = useCallback(
    (mimirNodesIds: string[]) => {
      const flowNodeIds: string[] = [];

      mimirNodesIds.forEach((mn) => {
        flowNodes.forEach((fn) => {
          if (fn.id === mn) flowNodeIds.push(fn.id);
        });
      });

      setSelectedNodes(flowNodeIds);
    },
    [flowNodes, setSelectedNodes]
  );

  return [setActiveNodes];
};
