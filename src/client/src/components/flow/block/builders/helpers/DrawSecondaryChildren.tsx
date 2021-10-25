import { Elements } from "react-flow-renderer";
import { BuildSecondaryChildNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsFamily } from "../../../helpers";
import { IsDirectChild } from "../../helpers";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param secondaryNode
 * @param elements
 */
const DrawSecondaryChildren = (edges: Edge[], nodes: Node[], secondaryNode: Node, elements: Elements<any>) => {
  if (secondaryNode) {
    edges.forEach((edge) => {
      if (edge.fromNodeId === secondaryNode.id && IsFamily(secondaryNode, edge.toNode)) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId && IsDirectChild(node, secondaryNode));
        const parentNode = nodes.find((node) => node.id === secondaryNode.id);

        if (toNode && parentNode) elements.push(BuildSecondaryChildNode(toNode, parentNode));
      }
    });
  }
};

export default DrawSecondaryChildren;
