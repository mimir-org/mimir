import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode } from ".";
import { DrawChildNodes, DrawConnectViewChildren, DrawEdges, DrawSplitViewChildren } from "./helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param splitView
 * @param splitViewNode
 * @param mainConnectNodes
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  splitView: boolean,
  splitViewNode: Node,
  mainConnectNodes: Node[]
) => {
  if (!project) return;
  const elements: Elements = [];
  const connectView = mainConnectNodes?.length > 0;
  const allNodes = project.nodes;

  const parentBlock = BuildParentBlockNode(selectedNode, splitView, false);
  parentBlock && elements.push(parentBlock);

  if (splitViewNode) {
    const parentSplitBlock = BuildParentBlockNode(splitViewNode, true, true);
    parentSplitBlock && elements.push(parentSplitBlock);
  }

  DrawChildNodes(project.edges, allNodes, selectedNode, elements);
  DrawEdges(project.edges, allNodes, elements);
  splitView && splitViewNode && DrawSplitViewChildren(project.edges, allNodes, splitViewNode, elements);
  connectView && DrawConnectViewChildren(mainConnectNodes, elements, allNodes);

  return elements;
};

export default BuildBlockElements;
