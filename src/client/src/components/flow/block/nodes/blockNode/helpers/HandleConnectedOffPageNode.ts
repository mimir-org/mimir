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
 * This component is called from the BlockNode component.
 * @param node
 * @param edges
 * @param size
 * @param dispatch
 */
export const HandleConnectedOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  if (!edges.length || !node) return;

  edges.forEach((edge) => {
    if (!IsValidTransport(edge, node)) return;
    const isNodeTarget = edge.toNodeId === node.id;

    if (!OnlyOneNodeVisible(edge, isNodeTarget)) return;

    const offPageExists = HasConnectedOffPageNode(edges, edge, isNodeTarget);
    if (!offPageExists) AddConnectedOffPageNode(node, isNodeTarget, edge, size, dispatch);
  });
};

function HasConnectedOffPageNode(edges: Edge[], edge: Edge, isTargetNode: boolean) {
  const existingEdge = isTargetNode
    ? edges.find((x) => IsOffPage(x?.fromNode) && x.toConnectorId === edge.toConnectorId)
    : edges.find((x) => IsOffPage(x?.toNode) && x.fromConnectorId === edge.fromConnectorId);

  return existingEdge !== undefined;
}

function IsValidTransport(edge: Edge, node: Node) {
  return (
    IsTransportConnection(edge.fromConnector, edge.toConnector) &&
    (node.id === edge.fromNodeId || node?.id === edge.toNodeId) &&
    !IsOffPage(edge.toNode) &&
    !IsOffPage(edge.fromNode)
  );
}

function AddConnectedOffPageNode(node: Node, isNodeTarget: boolean, edge: Edge, size: BlockNodeSize, dispatch: Dispatch) {
  const nodeParent = GetParent(node);
  const xPos = isNodeTarget ? nodeParent?.positionBlockX : size.width;
  const connector = node.connectors.find((c) => (isNodeTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId));
  const position = { x: xPos, y: node?.positionBlockY };

  CreateConnectedOffPageNode(node, connector, position, dispatch);
}

function OnlyOneNodeVisible(edge: Edge, isNodeTarget: boolean) {
  const sourceNode = isNodeTarget ? edge.fromNode : edge.toNode;
  const targetNode = isNodeTarget ? edge.toNode : edge.fromNode;

  const sourceNodeParent = GetParent(sourceNode);
  const targetNodeParent = GetParent(targetNode);
  const targetNodeVisible = sourceNodeParent.id === targetNodeParent.id;

  return !targetNodeVisible;
}
