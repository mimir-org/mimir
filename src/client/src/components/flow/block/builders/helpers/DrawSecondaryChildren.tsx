import { Elements } from "react-flow-renderer";
import { BuildSecondaryChildNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsFamily } from "../../../helpers";
import { IsDirectChild } from "../../helpers";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param edges
 * @param nodes
 * @param secondary
 * @param elements
 */
const DrawSecondaryChildren = (edges: Edge[], nodes: Node[], secondary: Node, elements: Elements<any>) => {
  if (secondary) {
    edges.forEach((edge) => {
      if (edge.fromNodeId === secondary.id && IsFamily(secondary, edge.toNode)) {
        const toNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondary));
        const parent = nodes.find((n) => n.id === secondary.id);

        if (toNode && parent) elements.push(BuildSecondaryChildNode(toNode, parent));
      }
    });
  }
};

export default DrawSecondaryChildren;
