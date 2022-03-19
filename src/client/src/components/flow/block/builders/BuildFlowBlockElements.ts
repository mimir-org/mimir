import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildFlowParentNode, BuildFlowSecondaryParentNode } from ".";
import { DrawFlowBlockEdges, DrawFlowChildNodes, DrawFlowSecondaryChildren } from "./helpers";
import { BlockNodeSize } from "../../../../models/project";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param animatedEdge
 * @param parentNodeSize
 * @returns all Elements.
 */
const BuildFlowBlockElements = (
  project: Project,
  selectedNode: Node,
  secondaryNode: Node,
  animatedEdge: boolean,
  parentNodeSize: BlockNodeSize
) => {
  if (!project) return;

  const elements: Elements = [];
  const splitView = secondaryNode !== null;

  const parentBlock = BuildFlowParentNode(selectedNode);
  if (parentBlock) elements.push(parentBlock);

  if (splitView) {
    const secondary = project.nodes?.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildFlowSecondaryParentNode(selectedNode, secondary);
    if (parentSecondaryBlock) elements.push(parentSecondaryBlock);
    DrawFlowSecondaryChildren(project, secondaryNode, elements, parentNodeSize);
  }

  DrawFlowChildNodes(project, selectedNode, elements, secondaryNode, parentNodeSize);
  DrawFlowBlockEdges(project, elements, secondaryNode, animatedEdge);

  return elements;
};

export default BuildFlowBlockElements;
