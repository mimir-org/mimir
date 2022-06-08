import { Edge as FlowEdge } from "react-flow-renderer";
import { IsProduct } from "../../../../helpers/Aspects";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../helpers/Connectors";
import { GetBlockEdgeType } from "../helpers";
import { BuildFlowBlockEdge } from "./BuildFlowBlockEdge";

/**
 * Component to draw all Flow edges in BlockView.
 * These elements contain the data for edges. In addition to the FlowEdges, Mimir Edges are created,
 * with the extra functionality needed for Mimir. The FlowEdges and MimirEdges co-exist
 * and share the same id and position.
 * @param mimirNodes
 * @param mimirEdges
 * @param selectedBlockNode
 * @param secondaryNode
 * @param animatedEdge
 * @returns all validated FlowEdges.
 */
const BuildFlowBlockEdges = (
  mimirNodes: Node[],
  mimirEdges: Edge[],
  selectedBlockNode: Node,
  secondaryNode: Node,
  animatedEdge: boolean
) => {
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    if (IsPartOfRelation(edge.fromConnector) && !ValidatePartOfEdge(edge)) return;
    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, selectedBlockNode, secondaryNode, animatedEdge);
    if (blockEdge) flowEdges.push(blockEdge);
  });

  return flowEdges;
};

/**
 * A partOf edge should only be visible between Product nodes.
 * @param edge
 * @returns a boolean value.
 */
function ValidatePartOfEdge(edge: Edge) {
  return IsProduct(edge.fromNode) && IsProduct(edge.toNode);
}

export default BuildFlowBlockEdges;
