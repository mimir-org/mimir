import { useReactFlow, useStore } from "react-flow-renderer";
import { useCallback, useMemo } from "react";

export type SetFlowNodeFunction = (mimirNodesIds: string[]) => void;

export const UseSetSelectNodes = (): [SetFlowNodeFunction] => {
  const setSelectedNodes = useStore().addSelectedNodes;
  const flowNodes = useReactFlow().getNodes();

  const nodeIds: string[] = useMemo(() => [], []);

  // flowNodes.forEach((n) => {
  //   nodeIds.push(n.id);
  // });

  const setActiveNode = useCallback(() => {
    setSelectedNodes(nodeIds);
  }, [nodeIds, setSelectedNodes]);

  const setActiveNodes = useCallback(
    (mimirNodesIds: string[]) => {
      const flowNodeIds: string[] = [];

      mimirNodesIds.forEach((mn) => {
        flowNodes.forEach((fn) => {
          if (fn.id === mn) nodeIds.push(fn.id);
        });
      });
      console.log("KAISS: ", mimirNodesIds);

      setSelectedNodes(nodeIds);
    },
    [nodeIds, setSelectedNodes]
  );

  return [setActiveNodes];
};
