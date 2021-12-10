import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode, BuildParentSecondaryNode, BuildParentProductNode } from ".";
import { DrawChildNodes, DrawProductChildren, DrawBlockEdges, DrawSecondaryChildren } from "./helpers";
import { IsProduct } from "../../../../helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @param parentSize
 * @param parentProductSize
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

  // Product nodes have a different view
  if (IsProduct(selectedNode)) {
    const parentProduct = BuildParentProductNode(selectedNode, explorerOpen);
    parentProduct && elements.push(parentProduct);

    DrawProductChildren(edges, nodes, selectedNode, elements, animatedEdge);
    return elements;
  }

  const parentBlock = BuildParentBlockNode(selectedNode, libOpen, explorerOpen);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildParentSecondaryNode(selectedNode, secondary);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(edges, nodes, selectedNode, elements);
  secondaryNode && DrawSecondaryChildren(edges, nodes, secondaryNode, elements);
  DrawBlockEdges(edges, nodes, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
