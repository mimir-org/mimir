import { Elements } from "react-flow-renderer";
import { BuildSecondaryChildNode } from "..";
import { Node, Edge } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";
import { IsFamily } from "../../../helpers";
import { IsDirectChild } from "../../helpers";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param secondary
 * @param elements
 * @param parentNodeSize
 */
const DrawSecondaryChildren = (
  edges: Edge[],
  nodes: Node[],
  secondary: Node,
  elements: Elements<any>,
  parentNodeSize: BlockNodeSize
) => {
  if (secondary) {
    edges.forEach((edge) => {
      if (edge.fromNodeId === secondary.id && IsFamily(secondary, edge.toNode)) {
        const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondary));
        const parent = nodes.find((n) => n.id === secondary.id);

        if (targetNode && parent) elements.push(BuildSecondaryChildNode(targetNode, parent, parentNodeSize));
      }
    });
  }
};

export default DrawSecondaryChildren;
