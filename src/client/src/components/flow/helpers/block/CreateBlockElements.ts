import red from "../../../../redux/store";
import { Elements } from "react-flow-renderer";
import { IsTransportTerminal } from "../common";
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
  connectNodes: Node[],
  selectedBlockNodeId: string,
  splitView: boolean,
  splitViewNode: Node
): Elements => {
  if (!project) return;
  const initialElements: Elements = [];
  const nodes = red.store.getState().projectState.project.nodes as Node[];

  const mainConnectNodes = red.store.getState().connectView.mainNodes as Node[];
  const mainConnectNode = mainConnectNodes.find(
    (x) => x?.id === selectedBlockNodeId
  );

  // Draw parent block
  const parentBlock = CreateParentBlockNode(selectedNode);
  if (parentBlock) initialElements.push(parentBlock);

  // Draw child nodes
  project.edges.forEach((edge) => {
    if (
      edge.fromNodeId === selectedNode.id &&
      selectedNode?.aspect === edge.toNode?.aspect
      //  && !IsTransportTerminal(edge.toConnector) TODO FIX
    ) {
      const toNode = nodes.find((node) => node.id === edge.toNodeId);
      initialElements.push(CreateBlockNode(toNode, null, splitView));
    }
  });

  // Draw splitview nodes
  if (splitViewNode && splitView) {
    project.edges.forEach((edge) => {
      if (
        edge.fromNode === splitViewNode &&
        splitViewNode?.aspect === edge.toNode?.aspect &&
        !IsTransportTerminal(edge.toConnector)
      )
        initialElements.push(CreateSplitViewNode(edge.toNode));
    });
  }

  // Draw connection view
  if (mainConnectNodes.length > 0) {
    CreateConnectMainNode(mainConnectNode);
    connectNodes.forEach((node) => {
      initialElements.push(CreateBlockNode(node, mainConnectNode, false));
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
