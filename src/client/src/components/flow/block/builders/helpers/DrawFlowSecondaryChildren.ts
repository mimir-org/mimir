import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowSecondaryChildNode } from "..";
import { IsFamily, IsDirectChild } from "../../../../../helpers/Family";
import { Node, Project } from "../../../../../models";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param flowNodes
 */
const DrawFlowSecondaryChildren = (project: Project, primaryNode: Node, secondaryNode: Node, flowNodes: FlowNode[]) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    const isChild = edge.fromNodeId === secondaryNode.id && IsFamily(secondaryNode, edge.toNode);
    if (!isChild) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondaryNode));
    if (!targetNode) return;

    const childNode = BuildFlowSecondaryChildNode(primaryNode, secondaryNode, targetNode);
    if (childNode) flowNodes.push(childNode);
  });
};

export default DrawFlowSecondaryChildren;
