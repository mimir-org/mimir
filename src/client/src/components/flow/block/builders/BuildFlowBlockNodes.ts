import { Node as FlowNode } from "react-flow-renderer";
import { Node, Edge } from "../../../../models";
import { BuildFlowParentNode, BuildFlowSecondaryParentNode } from ".";
import { DrawFlowChildNodes, DrawFlowSecondaryChildren } from "./helpers";

/**
 * Component to draw all Flow nodes in BlockView.
 * These nodes contain the data for the nodes. In addition to the FlowNodes, MimirNodes are created,
 * with the extra functionality needed for Mimir. The FlowNodes and MimirEdges co-exist
 * and share the same id and position.
 * @param mimirNodes
 * @param mimirEdges
 * @param primaryNode
 * @param secondaryNode
 * @returns all validated FlowNodes.
 */
const BuildFlowBlockNodes = (mimirNodes: Node[], mimirEdges: Edge[], primaryNode: Node, secondaryNode: Node) => {
  const flowNodes: FlowNode[] = [];
  const splitView = secondaryNode != undefined;

  const parentBlockNode = BuildFlowParentNode(primaryNode);
  if (!parentBlockNode) return flowNodes;

  flowNodes.push(parentBlockNode);

  if (splitView) {
    const parentSecondaryBlock = BuildFlowSecondaryParentNode(primaryNode, secondaryNode);
    if (!parentSecondaryBlock) return flowNodes;

    flowNodes.push(parentSecondaryBlock);
    DrawFlowSecondaryChildren(mimirNodes, mimirEdges, primaryNode, secondaryNode, flowNodes);
  }

  DrawFlowChildNodes(mimirNodes, mimirEdges, primaryNode, secondaryNode, flowNodes);

  return flowNodes;
};

export default BuildFlowBlockNodes;
