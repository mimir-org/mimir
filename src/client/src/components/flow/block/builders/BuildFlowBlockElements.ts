import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildFlowParentNode, BuildFlowSecondaryParentNode } from ".";
import { DrawFlowBlockEdges, DrawFlowChildNodes, DrawFlowSecondaryChildren } from "./helpers";

/**
 * Component to draw all Flow nodes and edges in BlockView.
 * These elements contain the data for the nodes and edges. In addition to the FlowElements, Mimir Nodes and Mimir Edges
 * are created, with the extra functionality needed for Mimir. The Flow elements and Mimir elements co-exist
 * and share the same id and position.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @returns all FlowElements.
 */
const BuildFlowBlockElements = (project: Project, selectedNode: Node, secondaryNode: Node, animatedEdge: boolean) => {
  if (!project) return;

  const flowElements: Elements = [];
  const splitView = secondaryNode !== null;

  const parentBlockNode = BuildFlowParentNode(selectedNode);
  if (!parentBlockNode) return;

  flowElements.push(parentBlockNode);
  const size = { width: parentBlockNode.data.width, height: parentBlockNode.data.height };

  if (splitView) {
    const secondary = project.nodes?.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildFlowSecondaryParentNode(selectedNode, secondary);
    if (!parentSecondaryBlock) return;

    flowElements.push(parentSecondaryBlock);
    DrawFlowSecondaryChildren(project, secondaryNode, flowElements, size);
  }

  DrawFlowChildNodes(project, size, selectedNode, secondaryNode, flowElements);
  DrawFlowBlockEdges(project, secondaryNode, flowElements, animatedEdge);

  return flowElements;
};

export default BuildFlowBlockElements;
