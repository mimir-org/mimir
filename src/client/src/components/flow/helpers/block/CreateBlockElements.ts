import { Elements } from "react-flow-renderer";
import { IsNodeSameType } from "../common";
import {
  Project,
  EDGE_TYPE,
  EdgeType,
  Node,
  RELATION_TYPE,
} from "../../../../models/project";
import {
  CreateBlockEdge,
  CreateSplitViewNode,
  CreateParentBlockNode,
  CreateBlockNode,
} from ".";

const CreateBlockElements = (
  project: Project,
  nodeId: string,
  splitViewNode: Node,
  splitView: boolean
): Elements => {
  if (!project) return;
  const initialElements: Elements = [];
  const selectedNode = project.nodes.find((node) => node.id === nodeId);

  // Draw block
  const parentBlock = CreateParentBlockNode(selectedNode);
  if (parentBlock) initialElements.push(parentBlock);

  // Draw nodes for the left block
  project.edges.forEach((edge) => {
    if (edge.fromNode === nodeId) {
      const toNode = project.nodes?.find((x) => x.id === edge.toNode);

      let connectorType = toNode?.connectors?.find(
        (x) => x.id === edge?.toConnector
      )?.relationType;

      if (
        (selectedNode?.type === toNode?.type ||
          IsNodeSameType(selectedNode, toNode)) &&
        connectorType !== RELATION_TYPE.Transport
      )
        initialElements.push(CreateBlockNode(toNode, splitView));
    }
  });

  // Draw splitview nodes
  if (splitViewNode && splitView) {
    project.edges.forEach((edge) => {
      if (edge.fromNode === splitViewNode.id) {
        const toNode = project.nodes?.find((x) => x.id === edge.toNode);

        let connectorType = toNode?.connectors?.find(
          (x) => x.id === edge?.toConnector
        )?.relationType;

        if (
          (splitViewNode?.type === toNode?.type ||
            IsNodeSameType(splitViewNode, toNode)) &&
          connectorType !== RELATION_TYPE.Transport
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
