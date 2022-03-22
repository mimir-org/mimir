import { Elements } from "react-flow-renderer";
import { BuildFlowSecondaryChildNode } from "..";
import { IsDirectChild, IsFamily } from "../../../../../helpers";
import { Node, Project } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param project
 * @param secondaryNode
 * @param elements
 * @param size
 */
const DrawFlowSecondaryChildren = (project: Project, secondaryNode: Node, elements: Elements, size: BlockNodeSize) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    const isChild = edge.fromNodeId === secondaryNode.id && IsFamily(secondaryNode, edge.toNode);
    if (!isChild) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondaryNode));
    if (!targetNode) return;

    const childNode = BuildFlowSecondaryChildNode(targetNode, size);
    if (childNode) elements.push(childNode);
  });
};

export default DrawFlowSecondaryChildren;
