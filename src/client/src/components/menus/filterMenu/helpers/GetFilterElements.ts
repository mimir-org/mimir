import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { Edge, Node } from "../../../../models";

export const ConvertFlowElements = (flowNodes: FlowNode[], flowEdges: FlowEdge[]) => {
  const mimirNodes: Node[] = [];
  const mimirEdges: Edge[] = [];

  flowNodes?.forEach((flowNode) => {
    const node = flowNode.data as Node;
    if (node) mimirNodes.push(node);
  });

  flowEdges?.forEach((elem) => {
    const edge = elem.data.edge as Edge;
    if (edge) mimirEdges.push(edge);
  });

  return { mimirNodes, mimirEdges };
};
