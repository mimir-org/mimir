import { Elements } from "react-flow-renderer";
import { BuildSecondaryChildNode } from "..";
import { IsFamily, IsDirectChild } from "../../../../../helpers";
import { Node, Edge } from "../../../../../models";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param secondary
 * @param elements
 * @param libOpen
 * @param explorerOpen
 */
const DrawSecondaryChildren = (
  edges: Edge[],
  nodes: Node[],
  secondary: Node,
  elements: Elements<any>,
  libOpen: boolean,
  explorerOpen: boolean
) => {
  if (secondary) {
    edges.forEach((edge) => {
      if (edge.fromNodeId === secondary.id && IsFamily(secondary, edge.toNode)) {
        const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondary));
        const parent = nodes.find((n) => n.id === secondary.id);

        if (targetNode && parent) elements.push(BuildSecondaryChildNode(targetNode, libOpen, explorerOpen));
      }
    });
  }
};

export default DrawSecondaryChildren;
