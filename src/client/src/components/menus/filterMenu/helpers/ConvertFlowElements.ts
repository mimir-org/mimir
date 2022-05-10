import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { Edge, Node } from "../../../../models";

export const ConvertFlowElements = (flowNodes: FlowNode[], flowEdges: FlowEdge[]) => {
  const mimirNodes = flowNodes?.map((flowNode) => flowNode.data as Node);
  const mimirEdges = flowEdges?.map((flowEdge) => flowEdge.data.edge as Edge);

  return { mimirNodes, mimirEdges };
};
