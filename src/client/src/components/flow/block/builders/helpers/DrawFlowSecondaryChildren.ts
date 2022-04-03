import { Elements } from "react-flow-renderer";
import { BuildFlowSecondaryChildNode } from "..";
import { IsDirectChild, IsFamily } from "../../../../../helpers";
import { Node, Project } from "../../../../../models";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param elements
 */
const DrawFlowSecondaryChildren = (project: Project, primaryNode: Node, secondaryNode: Node, elements: Elements) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    const isChild = edge.fromNodeId === secondaryNode.id && IsFamily(secondaryNode, edge.toNode);
    if (!isChild) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n.id, secondaryNode.id));
    if (!targetNode) return;

    const childNode = BuildFlowSecondaryChildNode(primaryNode, secondaryNode, targetNode);
    if (childNode) elements.push(childNode);
  });
};

export default DrawFlowSecondaryChildren;
