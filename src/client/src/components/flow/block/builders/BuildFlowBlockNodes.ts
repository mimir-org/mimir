import { Edge, Node } from "@mimirorg/modelbuilder-types";
import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowParentNode } from ".";
import { DrawFlowChildNodes } from "./helpers";

/**
 * Component to draw all Flow nodes in BlockView.
 * These nodes contain the data for the nodes. In addition to the FlowNodes, MimirNodes are created,
 * with the extra functionality needed for Mimir. The FlowNodes and MimirEdges co-exist
 * and share the same id and position.
 * @param mimirNodes
 * @param mimirEdges
 * @param primaryNode
 * @returns all validated FlowNodes.
 */
const BuildFlowBlockNodes = (mimirNodes: Node[], mimirEdges: Edge[], primaryNode: Node) => {
  const flowNodes: FlowNode[] = [];

  const parentBlockNode = BuildFlowParentNode(primaryNode);
  if (!parentBlockNode) return flowNodes;

  flowNodes.push(parentBlockNode);
  DrawFlowChildNodes(mimirNodes, mimirEdges, primaryNode, flowNodes);

  return flowNodes;
};

export default BuildFlowBlockNodes;
