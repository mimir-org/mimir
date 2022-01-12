import { Elements } from "react-flow-renderer";
import { BuildSecondaryChildNode } from "..";
import { IsFamily, IsDirectChild } from "../../../../../helpers";
import { Node, Project } from "../../../../../models";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param project
 * @param secondary
 * @param elements
 * @param libOpen
 * @param explorerOpen
 */
const DrawSecondaryChildren = (
  project: Project,
  secondary: Node,
  elements: Elements<any>,
  libOpen: boolean,
  explorerOpen: boolean
) => {
  const nodes = project.nodes;
  const edges = project.edges;

  if (secondary) {
    edges?.forEach((edge) => {
      if (edge.fromNodeId === secondary.id && IsFamily(secondary, edge.toNode)) {
        const targetNode = nodes.find((n) => n.id === edge.toNodeId && IsDirectChild(n, secondary));
        if (targetNode) elements.push(BuildSecondaryChildNode(targetNode, libOpen, explorerOpen));
      }
    });
  }
};

export default DrawSecondaryChildren;
