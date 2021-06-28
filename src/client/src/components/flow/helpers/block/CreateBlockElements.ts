import { Elements } from "react-flow-renderer";
import { IsPartOfTerminal } from "../common";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { Node, Project } from "../../../../models";
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
): Elements => {
  if (!project) return;
  const initialElements: Elements = [];
  const nodes = project.nodes;
  const edges = project.edges;

  // Draw parent block
  const parentBlock = CreateParentBlockNode(selectedNode);
  if (parentBlock) initialElements.push(parentBlock);

  // Draw child nodes
  edges.forEach((edge) => {
    if (
      edge.fromNodeId === selectedNode?.id &&
      selectedNode?.aspect === edge.toNode?.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      initialElements.push(CreateBlockNode(toNode, null, splitView));
    }
  });

  // Draw splitview nodes
  if (splitViewNode && splitView) {
    edges.forEach((edge) => {
      if (
        edge.fromNodeId === splitViewNode.id &&
        splitViewNode?.aspect === edge.toNode?.aspect
      ) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId);
        initialElements.push(CreateSplitViewNode(toNode));
      }
    });
  }

  // Draw connection nodes
  if (mainConnectNodes?.length > 0) {
    mainConnectNodes.forEach((mainNode) => {
      mainNode.connectNodes?.forEach((node) => {
        const connectNode = nodes.find((x) => x.id === node.id);
        initialElements.push(CreateBlockNode(connectNode, mainNode, false));
      });
    });
  }

  // Draw edges
  edges.forEach((edge) => {
    const blockEdge = CreateBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType);
    if (blockEdge) initialElements.push(blockEdge);
  });

  return initialElements;
};

export default CreateBlockElements;
