import { Edge as FlowEdge } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { DrawFlowBlockEdges } from "./helpers";

/**
 * Component to draw all Flow nodes and edges in BlockView.
 * These elements contain the data for the nodes and edges. In addition to the FlowElements, Mimir Nodes and Mimir Edges
 * are created, with the extra functionality needed for Mimir. The Flow elements and Mimir elements co-exist
 * and share the same id and position.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param animatedEdge
 * @returns all FlowElements.
 */
const BuildFlowBlockEdges = (project: Project, primaryNode: Node, secondaryNode: Node, animatedEdge: boolean) => {
  if (!project) return;

  const flowEdges: FlowEdge[] = [];

  DrawFlowBlockEdges(project, secondaryNode, flowEdges, animatedEdge);

  return flowEdges;
};

export default BuildFlowBlockEdges;
