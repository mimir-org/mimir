import { useCallback } from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";
import { Node } from "../models";

type SetFlowElementFunction = (elements: Node[]) => void;

export const UseSetSelectNodes = (): [SetFlowElementFunction] => {
  const setSelectedElements = useStoreActions((state) => state.setSelectedElements);

  const nodes = useStoreState((state) => state.nodes);

  const setActiveNodes = useCallback(
    (elements: Node[]) => {
      let nodesArray = [];
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
