import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode, BuildParentSecondaryNode, BuildParentProductNode } from ".";
import { DrawChildNodes, DrawProductChildren, DrawBlockEdges, DrawSecondaryChildren } from "./helpers";
import { BlockNodeSize } from "../../../../models/project";
import { IsProduct } from "../../../../helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param parentNode
 * @param parentNodeSize
 * @param animatedEdge
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  secondaryNode: Node,
  parentNode: Node,
  parentNodeSize: BlockNodeSize,
  animatedEdge: boolean
) => {
  if (!project) return;
  const elements: Elements = [];
  const nodes = project.nodes;
  const edges = project.edges;

  // Product nodes have a different view
  if (IsProduct(selectedNode)) {
    const parentProduct = BuildParentProductNode(selectedNode);
    parentProduct && elements.push(parentProduct);

    DrawProductChildren(edges, nodes, selectedNode, elements, animatedEdge);
    return elements;
  }

  const parentBlock = BuildParentBlockNode(selectedNode);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildParentSecondaryNode(selectedNode, secondary, parentNodeSize);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(edges, nodes, selectedNode, elements, parentNode, parentNodeSize);
  secondaryNode && DrawSecondaryChildren(edges, nodes, secondaryNode, elements, parentNodeSize);
  DrawBlockEdges(edges, nodes, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
