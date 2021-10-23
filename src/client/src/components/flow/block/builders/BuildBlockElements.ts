import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode } from ".";
import { DrawChildNodes, DrawConnectViewChildren, DrawEdges, DrawSplitViewChildren } from "./helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param splitViewNode
 * @param mainConnectNodes
 * @param parentNode
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  splitViewNode: Node,
  mainConnectNodes: Node[],
  parentNode: Node
) => {
  if (!project) return;
  const elements: Elements = [];
  const connectView = mainConnectNodes?.length > 0;
  const allNodes = project.nodes;

  const parentBlock = BuildParentBlockNode(selectedNode);
  parentBlock && elements.push(parentBlock);

  if (splitViewNode) {
    const parentSplitBlock = BuildParentBlockNode(splitViewNode);
    parentSplitBlock && elements.push(parentSplitBlock);
  }

  DrawChildNodes(project.edges, allNodes, selectedNode, elements, parentNode);
  DrawEdges(project.edges, allNodes, elements);
  splitViewNode && DrawSplitViewChildren(project.edges, allNodes, splitViewNode, elements);
  connectView && DrawConnectViewChildren(mainConnectNodes, elements, allNodes, parentNode);

  return elements;
};

export default BuildBlockElements;
