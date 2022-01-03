import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentNode, BuildSecondaryParentNode, BuildProductParentNode } from ".";
import { DrawChildNodes, DrawProductChildren, DrawBlockEdges, DrawSecondaryChildren } from "./helpers";
import { IsProduct } from "../../../../helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @param libOpen
 * @param explorerOpen
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  secondaryNode: Node,
  animatedEdge: boolean,
  libOpen: boolean,
  explorerOpen: boolean
) => {
  if (!project) return;
  const elements: Elements = [];
  const nodes = project.nodes;
  const edges = project.edges;
  const splitView = secondaryNode !== null;

  // Product nodes have a different view
  if (IsProduct(selectedNode)) {
    const parentProduct = BuildProductParentNode(selectedNode, explorerOpen);
    if (parentProduct) elements.push(parentProduct);
    DrawProductChildren(edges, nodes, selectedNode, elements, animatedEdge, libOpen, explorerOpen, splitView);
    return elements;
  }

  const parentBlock = BuildParentNode(selectedNode, libOpen, explorerOpen);
  if (parentBlock) elements.push(parentBlock);

  if (splitView) {
    const secondary = nodes?.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildSecondaryParentNode(selectedNode, secondary, libOpen, explorerOpen);
    if (parentSecondaryBlock) elements.push(parentSecondaryBlock);
    DrawSecondaryChildren(edges, nodes, secondaryNode, elements, libOpen, explorerOpen);
  }

  DrawChildNodes(edges, nodes, selectedNode, elements, libOpen, explorerOpen, splitView);
  DrawBlockEdges(edges, nodes, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
