import { useCallback } from "react";
import { useReactFlow, useStore } from "react-flow-renderer";
import { Node } from "../models";

export type SetFlowElementFunction = (elements: Node[]) => void;

export const UseSetSelectNodes = (): [SetFlowElementFunction] => {
  const setSelectedElements = useStore().addSelectedNodes; // useStoreActions((state) => state.setSelectedElements);

  const nodes = useReactFlow().getNodes();

  const setActiveNodes = useCallback(
    (elements: Node[]) => {
      const nodesArray = [];
      elements.forEach((e) => {
        nodes.forEach((n) => {
          if (n.id === e.id) {
            nodesArray.push(n);
          }
        });
      });
      setSelectedElements(nodesArray);
    },
    [nodes, setSelectedElements]
  );

  return [setActiveNodes];
};
