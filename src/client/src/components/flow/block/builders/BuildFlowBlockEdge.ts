import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { VisualFilterData } from "../../../../models/application/VisualFilter";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlowEdge } from "../../converters";

export const BuildFlowBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType, filter: VisualFilterData) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  if (!sourceNode || !targetNode) return;
  return ConvertEdgeToFlowEdge(edge, edgeType, sourceNode, targetNode, filter);
};

export default BuildFlowBlockEdge;
