import { useMemo } from "react";
import { GetSelectedFlowEdges, GetSelectedFlowNodes } from "./Selected";

/**
 * Component to get the id's of selected FlowNodes and FlowEdges.
 * @returns two arrays, one for FlowNodes, one for FlowEdges.
 */
export const GetSelectedFlowElementsIds = () => {
  const selectedFlowNodes = GetSelectedFlowNodes();
  const selectedFlowEdges = GetSelectedFlowEdges(selectedFlowNodes);

  const nodeIds = useMemo(() => selectedFlowNodes?.map((node) => node.id), [selectedFlowNodes]);
  const edgeIds = useMemo(() => selectedFlowEdges?.map((edge) => edge.id), [selectedFlowEdges]);

  return [nodeIds, edgeIds];
};
