import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentNode, BuildSecondaryParentNode } from ".";
import { DrawBlockEdges, DrawChildNodes, DrawSecondaryChildren } from "./helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @returns all Elements.
 */
const BuildBlockElements = (project: Project, selectedNode: Node, secondaryNode: Node, animatedEdge: boolean) => {
  if (!project) return;
  const elements: Elements = [];
  const splitView = secondaryNode !== null;

  const parentBlock = BuildParentNode(selectedNode);
  if (parentBlock) elements.push(parentBlock);

  if (splitView) {
    const secondary = project.nodes?.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildSecondaryParentNode(selectedNode, secondary);
    if (parentSecondaryBlock) elements.push(parentSecondaryBlock);
    DrawSecondaryChildren(project, secondaryNode, elements);
  }

  DrawChildNodes(project, selectedNode, elements, secondaryNode);
  DrawBlockEdges(project, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildBlockElements;
