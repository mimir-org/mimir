import { useCallback } from "react";
import { useReactFlow, useStore } from "react-flow-renderer";
import { Node } from "../models";

export type SetFlowElementFunction = (mimirNodes: Node[]) => void;

export const UseSetSelectNodes = (): [SetFlowElementFunction] => {
  const setSelectedElements = useStore().addSelectedNodes; // useStoreActions((state) => state.setSelectedElements);
  const flowNodes = useReactFlow().getNodes();

  const setActiveNodes = useCallback(
    (mimirNodes: Node[]) => {
      const nodesArray = [];

      mimirNodes.forEach((mn) => {
        flowNodes.forEach((fn) => {
          if (fn.id === mn.id) nodesArray.push(fn);
        });
      });

      setSelectedElements(nodesArray);
    },
    [flowNodes, setSelectedElements]
  );

  return [setActiveNodes];
};
