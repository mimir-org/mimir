import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode, BuildParentSecondaryNode } from ".";
import { DrawChildNodes, DrawEdges, DrawSecondaryChildren } from "./helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param parentNode
 * @param parentNodeSize
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  secondaryNode: Node,
  parentNode: Node,
  parentNodeSize: { width: number; length: number }
) => {
  if (!project) return;
  const elements: Elements = [];
  const allNodes = project.nodes;

  const parentBlock = BuildParentBlockNode(selectedNode);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = project.nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildParentSecondaryNode(selectedNode, secondary);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(project.edges, allNodes, selectedNode, elements, parentNode, parentNodeSize);
  DrawEdges(project.edges, allNodes, elements, secondaryNode);
  secondaryNode && DrawSecondaryChildren(project.edges, allNodes, secondaryNode, elements, parentNodeSize);

  return elements;
};

export default BuildBlockElements;
