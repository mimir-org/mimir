import { Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { BuildFlowBlockEdge } from "..";
import { Node, Project } from "../../../../../models";
import { IsPartOfTerminal } from "../../../helpers/CheckConnectorTypes";
import { GetBlockEdgeType } from "../../helpers";

/**
 * Component to draw all edges in BlockView. PartOf edges are not displayed in BlockView.
 * @param project
 * @param flowEdges
 * @param secondaryNode
 * @param animatedEdge
 */
const DrawFlowBlockEdges = (
  project: Project,
  secondaryNode: Node,
  flowEdges: FlowEdge[],
  flowNodes: FlowNode[],
  animatedEdge: boolean
) => {
  const mimirNodes = project.nodes;
  const mimirEdges = project.edges;

  mimirEdges.forEach((edge) => {
    if (IsPartOfTerminal(edge.fromConnector)) return;

    const sourceNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.fromNodeId);
    const targetNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.toNodeId);

    if (!sourceNodeIsDisplayed || !targetNodeIsDisplayed) return;

    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, secondaryNode, animatedEdge);

    if (blockEdge) flowEdges.push(blockEdge);
  });
};

export default DrawFlowBlockEdges;
