import red from "../../../../redux/store";
import { Elements } from "react-flow-renderer";
import { IsPartOfTerminal } from "../common";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { Node, Project } from "../../../../models";
import { CreateConnectMainNode } from "./connectView";
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
  mainNode: Node,
  connectNodes: Node[]
): Elements => {
  if (!project) return;
  const initialElements: Elements = [];
  const nodes = red.store.getState().projectState.project.nodes as Node[];

  // Draw parent block
  const parentBlock = CreateParentBlockNode(selectedNode);
  if (parentBlock) initialElements.push(parentBlock);

  // Draw child nodes
  project.edges.forEach((edge) => {
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
    project.edges.forEach((edge) => {
      if (
        edge.fromNodeId === splitViewNode.id &&
        splitViewNode?.aspect === edge.toNode?.aspect
        // !IsTransportTerminal(edge.toConnector)
      ) {
        const toNode = nodes.find((node) => node.id === edge.toNodeId);
        initialElements.push(CreateSplitViewNode(toNode));
      }
    });
  }

  // Draw connection view
  if (connectNodes?.length > 0) {
    CreateConnectMainNode(mainNode);
    connectNodes?.forEach((node) => {
      initialElements.push(CreateBlockNode(node, mainNode, false));
    });
  }

  // Draw edges
  project.edges.forEach((edge) => {
    const blockEdge = CreateBlockEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
    if (blockEdge) initialElements.push(blockEdge);
  });

  return initialElements;
};

export default CreateBlockElements;
