import { Edge as FlowEdge, Node as FlowNode } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { DrawFlowBlockEdges } from "./helpers";

/**
 * Component to draw all Flow noedges in BlockView.
 * These elements contain the data for edges. In addition to the FlowEdges, Mimir Edges
 * are created, with the extra functionality needed for Mimir. The FlowEdges and MimirEdges co-exist
 * and share the same id and position.
 * @param project
 * @param secondaryNode
 * @param animatedEdge
 * @returns all validated FlowEdges.
 */
const BuildFlowBlockEdges = (project: Project, secondaryNode: Node, flowNodes: FlowNode[], animatedEdge: boolean) => {
  if (!project) return;

  const flowEdges: FlowEdge[] = [];
  DrawFlowBlockEdges(project, secondaryNode, flowEdges, flowNodes, animatedEdge);

  return flowEdges;
};

export default BuildFlowBlockEdges;
