import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { Edge, Node } from "../../../../models";

/**
 * Component to convert FlowNodes and FlowEdges to MimirNodes and MimirEdges, used in the VisualFilterComponent.
 * @param flowNodes
 * @param flowEdges
 * @returns an object containing a list of MimirNodes and a list of MimirEdges.
 */
export const ConvertFlowElements = (flowNodes: FlowNode[], flowEdges: FlowEdge[]) => {
  const mimirNodes = flowNodes?.map((flowNode) => flowNode.data as Node);
  const mimirEdges = flowEdges?.map((flowEdge) => flowEdge.data.edge as Edge);

  return { mimirNodes, mimirEdges };
};
