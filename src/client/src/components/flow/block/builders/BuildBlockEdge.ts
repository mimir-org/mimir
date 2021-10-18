import { ShowBlockViewEdge } from "../helpers";
import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";

export const BuildBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  if (ShowBlockViewEdge(edge)) {
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode);
  }
};

export default BuildBlockEdge;