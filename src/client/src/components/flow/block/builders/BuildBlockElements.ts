import { Elements } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { BuildParentBlockNode, BuildParentSecondaryNode } from ".";
import { DrawChildNodes, DrawConnectViewChildren, DrawEdges, DrawSplitViewChildren } from "./helpers";

/**
 * Component to draw all nodes and edges in BlockView.
 * @param project
 * @param selectedNode
 * @param secondaryNode
 * @param mainConnectNodes
 * @param parentNode
 * @returns all Elements.
 */
const BuildBlockElements = (
  project: Project,
  selectedNode: Node,
  secondaryNode: Node,
  mainConnectNodes: Node[],
  parentNode: Node
) => {
  if (!project) return;
  const elements: Elements = [];
  const connectView = mainConnectNodes?.length > 0;
  const allNodes = project.nodes;

  const parentBlock = BuildParentBlockNode(selectedNode);
  parentBlock && elements.push(parentBlock);

  if (secondaryNode) {
    const secondary = project.nodes.find((x) => x.id === secondaryNode.id);
    const parentSecondaryBlock = BuildParentSecondaryNode(selectedNode, secondary);
    parentSecondaryBlock && elements.push(parentSecondaryBlock);
  }

  DrawChildNodes(project.edges, allNodes, selectedNode, elements, parentNode);
  DrawEdges(project.edges, allNodes, elements);
  secondaryNode && DrawSplitViewChildren(project.edges, allNodes, secondaryNode, elements);
  connectView && DrawConnectViewChildren(mainConnectNodes, elements, allNodes, parentNode);

  return elements;
};

export default BuildBlockElements;
