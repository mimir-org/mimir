import { Elements } from "react-flow-renderer";
import { IsNodeSameType, IsTransportTerminal } from "../common";
import { EDGE_TYPE, EdgeType } from "../../../../models/project";
import { Node, Project } from "../../../../models";
import {
  CreateBlockEdge,
  CreateSplitViewNode,
  CreateParentBlockNode,
  CreateBlockNode,
  CreateConnectViewNode,
} from ".";

const CreateBlockElements = (
  project: Project,
  nodeId: string,
  mainConnectNode: Node,
  connectNodes: Node[],
  selectedBlockNodeId: string,
  splitView: boolean,
  splitViewNode: Node
): Elements => {
  if (!project) return;
  const initialElements: Elements = [];
  const selectedNode = project.nodes.find((node) => node.id === nodeId);

  // Draw connection view
  if (mainConnectNode && mainConnectNode.id === selectedBlockNodeId) {
    CreateConnectViewNode(mainConnectNode);
    connectNodes.forEach((node) => {
      initialElements.push(CreateBlockNode(node, false, mainConnectNode));
    });
  }

  // Draw block
  const parentBlock = CreateParentBlockNode(selectedNode);
  if (parentBlock) initialElements.push(parentBlock);

  // Draw nodes for the left block
  project.edges.forEach((edge) => {
    if (edge.fromNode === nodeId) {
      const toNode = project.nodes?.find((x) => x.id === edge.toNode);
      let conn = toNode?.connectors?.find((x) => x.id === edge?.toConnector);

      if (
        (selectedNode?.type === toNode?.type ||
          IsNodeSameType(selectedNode, toNode)) &&
        !IsTransportTerminal(conn)
      )
        initialElements.push(
          CreateBlockNode(toNode, splitView, mainConnectNode)
        );
    }
  });

  // Draw splitview nodes
  if (splitViewNode && splitView) {
    project.edges.forEach((edge) => {
      if (edge.fromNode === splitViewNode.id) {
        const toNode = project.nodes?.find((x) => x.id === edge.toNode);

        const conn = toNode?.connectors?.find(
          (x) => x.id === edge?.toConnector
        );

        if (
          (splitViewNode?.type === toNode?.type ||
            IsNodeSameType(splitViewNode, toNode)) &&
          !IsTransportTerminal(conn)
        )
          initialElements.push(CreateSplitViewNode(toNode));
      }
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
