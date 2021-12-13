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

  // Product nodes have a different view
  if (IsProduct(selectedNode)) {
    const parentProduct = BuildProductParentNode(selectedNode, explorerOpen);
    parentProduct && elements.push(parentProduct);

    DrawProductChildren(edges, nodes, selectedNode, elements, animatedEdge);
    return elements;
  }

  const parentBlock = BuildParentNode(selectedNode, libOpen, explorerOpen);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildSecondaryParentNode(selectedNode, secondary, libOpen, explorerOpen);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(edges, nodes, selectedNode, elements, libOpen, explorerOpen, secondaryNode !== null);
  secondaryNode && DrawSecondaryChildren(edges, nodes, secondaryNode, elements, libOpen, explorerOpen);
  DrawBlockEdges(edges, nodes, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
