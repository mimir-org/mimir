import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { IsOffPage } from "../../../../helpers";
import { Edge, Node } from "../../../../models";

export const GetMimirElements = (flowNodes: FlowNode[], flowEdges: FlowEdge[]) => {
  const mimirNodes: Node[] = [];
  const mimirEdges: Edge[] = [];

  flowNodes?.forEach((flowNode) => {
    const node = flowNode.data as Node;
    if (node && !IsOffPage(node)) mimirNodes.push(node);
  });

  flowEdges?.forEach((elem) => {
    const edge = elem.data as Edge;
    if (edge && !IsOffPage(edge.fromNode)) mimirEdges.push(edge);
  });

  return { mimirNodes, mimirEdges };
};
