import { Elements } from "react-flow-renderer";
import { IsPartOfTerminal } from "../helpers/common";
import { EDGE_TYPE, EdgeType } from "../../../models/project";
import { Node, Project } from "../../../models";
import {
  CreateBlockEdge,
  CreateSplitViewNode,
  CreateParentBlockNode,
  CreateBlockNode,
} from ".";

const CreateBlockElements = (
  project: Project,
  selectedNode: Node,
  splitView: boolean,
  splitViewNode: Node,
  mainConnectNodes: Node[]
) => {
  if (!project) return;
  const elements: Elements = [];
  const nodes = project.nodes;
  const edges = project.edges;

  // Draw parent block
  const parentBlock = CreateParentBlockNode(selectedNode, splitView);
  if (parentBlock) elements.push(parentBlock);
  if (splitViewNode) {
    const parentSplitBlock = CreateParentBlockNode(splitViewNode, splitView);
    if (parentSplitBlock) elements.push(parentSplitBlock);
  }

  // Draw child nodes
  edges.forEach((edge) => {
    if (
      edge.fromNodeId === selectedNode?.id &&
      selectedNode?.aspect === edge.toNode.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      if (toNode) elements.push(CreateBlockNode(toNode, null, nodes));
    }
  });

  // Draw splitview nodes
  if (splitViewNode && splitView) {
    edges.forEach((edge) => {
      if (
        edge.fromNodeId === splitViewNode.id &&
        splitViewNode.aspect === edge.toNode.aspect
      ) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId);
        if (toNode) elements.push(CreateSplitViewNode(toNode));
      }
    });
  }

  // Draw connection nodes
  if (mainConnectNodes?.length > 0) {
    mainConnectNodes.forEach((mainNode) => {
      mainNode.connectNodes?.forEach((node) => {
        const connectNode = nodes.find((x) => x.id === node.id);
        if (connectNode)
          elements.push(CreateBlockNode(connectNode, mainNode, nodes));
      });
    });
  }

  // Draw edges
  edges.forEach((edge) => {
    const blockEdge = CreateBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType);
    if (blockEdge) elements.push(blockEdge);
  });

  return elements;
};

export default CreateBlockElements;
