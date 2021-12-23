import { CreateConnectedOffPageNode, HasConnectedOffPageNode } from ".";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { GetParent, IsTransportConnection } from "../../../../helpers";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen. The OffPageNode is only
 * a visual element, and is not part of the project's data model.
 * @param node
 * @param secondaryNode
 * @param edges
 * @param size
 * @param dispatch
 */
const HandleConnectedOffPageNode = (node: Node, secondaryNode: Node, edges: Edge[], size: BlockNodeSize, dispatch: any) => {
  edges.forEach((edge) => {
    if (IsValidTransport(edge, secondaryNode)) {
      const isNodeTarget = edge.toNodeId === node.id;

      if (OnlyOneNodeVisible(edge, isNodeTarget)) {
        const offPageExists = HasConnectedOffPageNode(edges, edge, isNodeTarget);
        if (!offPageExists) AddConnectedOffPageNode(node, isNodeTarget, edge, dispatch, size);
      }
    }
  });
};

function IsValidTransport(edge: Edge, secondaryNode: Node) {
  return (
    !secondaryNode &&
    IsTransportConnection(edge.fromConnector, edge.toConnector) &&
    !IsOffPage(edge.toNode) &&
    !IsOffPage(edge.fromNode)
  );
}

function AddConnectedOffPageNode(node: Node, isNodeTarget: boolean, edge: Edge, dispatch: any, size: BlockNodeSize) {
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

export default HandleConnectedOffPageNode;
