import { Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { IsProduct } from "../../../../helpers/Aspects";
import { Node, Edge } from "../../../../models";
import { IsPartOfTerminal } from "../../helpers/Connectors";
import { GetBlockEdgeType } from "../helpers";
import { BuildFlowBlockEdge } from "./BuildFlowBlockEdge";

/**
 * Component to draw all Flow edges in BlockView.
 * These elements contain the data for edges. In addition to the FlowEdges, Mimir Edges
 * are created, with the extra functionality needed for Mimir. The FlowEdges and MimirEdges co-exist
 * and share the same id and position.
 * @param mimirNodes
 * @param mimirEdges
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @returns all validated FlowEdges.
 */
const BuildFlowBlockEdges = (
  mimirNodes: Node[],
  mimirEdges: Edge[],
  selectedNode: Node,
  secondaryNode: Node,
  flowNodes: FlowNode[],
  animatedEdge: boolean
) => {
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    if (IsPartOfTerminal(edge.fromConnector) && !ValidatePartOfEdge(edge)) return;

    const sourceNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.fromNodeId);
    const targetNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.toNodeId);

    if (!sourceNodeIsDisplayed || !targetNodeIsDisplayed) return;

    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, selectedNode, secondaryNode, animatedEdge);

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
