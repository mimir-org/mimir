import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode, BuildParentSecondaryNode } from ".";
import { DrawChildNodes, DrawEdges, DrawSecondaryChildren } from "./helpers";
import { BlockNodeSize } from "../../../../models/project";

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

  const parentBlock = BuildParentBlockNode(selectedNode);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildParentSecondaryNode(selectedNode, secondary);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(edges, nodes, selectedNode, elements, parentNode, parentNodeSize);
  secondaryNode && DrawSecondaryChildren(edges, nodes, secondaryNode, elements, parentNodeSize);
  DrawEdges(edges, nodes, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
