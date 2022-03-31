import { useReactFlow, useStore } from "react-flow-renderer";
import { useCallback } from "react";
import { Node } from "../models";

export type SetFlowElementFunction = (mimirNodes: Node[]) => void;

export const UseSetSelectNodes = (): [SetFlowElementFunction] => {
  const setSelectedElements = useStore().addSelectedNodes;
  const flowNodes = useReactFlow().getNodes();

  const setActiveNodes = useCallback(
    (mimirNodes: Node[]) => {
      const flowNodeIds: string[] = [];

      mimirNodes.forEach((mn) => {
        flowNodes.forEach((fn) => {
          if (fn.id === mn.id) flowNodeIds.push(fn.id);
        });
      });

      setSelectedElements(flowNodeIds);
    },
    [flowNodes, setSelectedElements]
  );

  return [setActiveNodes];
};
