import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";

export const BuildTreeEdge = (edge: Edge, edgeType: EdgeType, nodes: Node[]) => {
  const sourceNode = nodes?.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes?.find((node) => node.id === edge.toNodeId);

  if (edge.fromNode && edge.toNode) {
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode);
  }
};

export default BuildTreeEdge;
