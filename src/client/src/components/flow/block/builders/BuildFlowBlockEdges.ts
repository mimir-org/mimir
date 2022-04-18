import { Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { IsPartOfTerminal } from "../../helpers/Connectors";
import { GetBlockEdgeType } from "../helpers";
import { BuildFlowBlockEdge } from "./BuildFlowBlockEdge";

/**
 * Component to draw all Flow edges in BlockView.
 * These elements contain the data for edges. In addition to the FlowEdges, Mimir Edges
 * are created, with the extra functionality needed for Mimir. The FlowEdges and MimirEdges co-exist
 * and share the same id and position.
 * @param project
 * @param secondaryNode
 * @param animatedEdge
 * @returns all validated FlowEdges.
 */
const BuildFlowBlockEdges = (project: Project, secondaryNode: Node, flowNodes: FlowNode[], animatedEdge: boolean) => {
  if (!project) return [];

  const mimirNodes = project.nodes;
  const mimirEdges = project.edges;
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    if (IsPartOfTerminal(edge.fromConnector)) return;

    const sourceNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.fromNodeId);
    const targetNodeIsDisplayed = flowNodes.some((flowNode) => flowNode.id === edge.toNodeId);

    if (!sourceNodeIsDisplayed || !targetNodeIsDisplayed) return;

    const edgeType = GetBlockEdgeType(edge.fromConnector, edge.fromNode, edge.toNode);
    const blockEdge = BuildFlowBlockEdge(mimirNodes, edge, edgeType, secondaryNode, animatedEdge);

    if (blockEdge) flowEdges.push(blockEdge);
  });

  return flowEdges;
};

export default BuildFlowBlockEdges;
