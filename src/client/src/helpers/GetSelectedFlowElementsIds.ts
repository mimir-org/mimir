import { useMemo } from "react";
import { GetSelectedFlowEdges, GetSelectedFlowNodes } from "./Selected";

/**
 * Component to get the id's of selected FlowEdges and FlowNodes.
 * @returns two arrays, one for FlowNodes, one for FlowEdges.
 */
export const GetSelectedFlowElementsIds = () => {
  const selectedNodes = GetSelectedFlowNodes();
  const selectedEdges = GetSelectedFlowEdges();

  const nodeIds = useMemo(() => selectedNodes?.map((node) => node.id), [selectedNodes]);
  const edgeIds = useMemo(() => selectedEdges?.map((edge) => edge.id), [selectedEdges]);

  return [nodeIds, edgeIds];
};
