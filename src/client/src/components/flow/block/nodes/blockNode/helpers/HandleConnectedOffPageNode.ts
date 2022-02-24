import { Dispatch } from "redux";
import { CreateConnectedOffPageNode } from "./CreateConnectedOffPageNode";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { GetParent, IsTransportConnection } from "../../../../helpers";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen. The OffPageNode is only
 * a visual element, and is not part of the project's data model.
 * @param node
 * @param edges
 * @param size
 * @param dispatch
 */
export const HandleConnectedOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  edges.forEach((edge) => {
    if (IsValidTransport(edge, node)) {
      const isNodeTarget = edge.toNodeId === node.id;

      if (OnlyOneNodeVisible(edge, isNodeTarget)) {
        const offPageExists = HasConnectedOffPageNode(edges, edge, isNodeTarget);
        if (!offPageExists) AddConnectedOffPageNode(node, isNodeTarget, edge, dispatch, size);
      }
    }
  });
};

function HasConnectedOffPageNode(edges: Edge[], edge: Edge, isTargetNode: boolean) {
  const existingOffPageEdge = isTargetNode
    ? edges?.find((x) => x?.toConnectorId === edge.toConnectorId && IsOffPage(x?.fromNode))
    : edges?.find((x) => x?.fromConnectorId === edge.fromConnectorId && IsOffPage(x?.toNode));

  return existingOffPageEdge !== undefined;
}

function IsValidTransport(edge: Edge, node: Node) {
  return (
    IsTransportConnection(edge.fromConnector, edge.toConnector) &&
    (node.id === edge.fromNodeId || node.id === edge.toNodeId) &&
    !IsOffPage(edge.toNode) &&
    !IsOffPage(edge.fromNode)
  );
}

function AddConnectedOffPageNode(node: Node, isNodeTarget: boolean, edge: Edge, dispatch: Dispatch, size: BlockNodeSize) {
  const nodeParent = GetParent(node);
  const xPos = isNodeTarget ? nodeParent?.positionBlockX : size.width;
  const connector = node?.connectors.find((c) => (isNodeTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId));

  CreateConnectedOffPageNode(node, connector, { x: xPos, y: node?.positionBlockY }, dispatch);
}

function OnlyOneNodeVisible(edge: Edge, isNodeTarget: boolean) {
  const sourceNode = isNodeTarget ? edge.fromNode : edge.toNode;
  const targetNode = isNodeTarget ? edge.toNode : edge.fromNode;

  const sourceNodeParent = GetParent(sourceNode);
  const targetNodeParent = GetParent(targetNode);
  const targetNodeVisible = sourceNodeParent.id === targetNodeParent.id;

  return !targetNodeVisible;
}
