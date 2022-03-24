import { Dispatch } from "redux";
import { CreateConnectedOffPageNode } from "./CreateConnectedOffPageNode";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { GetParent, IsTransportConnection } from "../../../../helpers";
import { EdgeIsConnectedToNode } from "../../../helpers/CheckEdgeConnections";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen.
 * The OffPageNode is only a visual element, and is not part of the project's data model.
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
    const isTarget = edge.toNodeId === node.id;
    if (!OnlyOneNodeVisible(edge, isTarget)) return;

    const nodeExists = HasConnectedOffPageNode(edges, edge, isTarget);
    if (nodeExists) return;

    const nodeParent = GetParent(node);
    const xPos = isTarget ? nodeParent?.positionBlockX : size.width;
    const connector = node.connectors.find((c) => (isTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId));
    const position = { x: xPos, y: node.positionBlockY };

    CreateConnectedOffPageNode(node, connector, position, dispatch);
  });
};

//#region Helpers
function HasConnectedOffPageNode(edges: Edge[], edge: Edge, isTargetNode: boolean) {
  const existingEdge = isTargetNode
    ? edges.find((x) => IsOffPage(x.fromNode) && x.toConnectorId === edge.toConnectorId)
    : edges.find((x) => IsOffPage(x.toNode) && x.fromConnectorId === edge.fromConnectorId);

  return existingEdge !== undefined;
}

function IsValidTransport(edge: Edge, node: Node) {
  return (
    !IsOffPage(edge.toNode) &&
    !IsOffPage(edge.fromNode) &&
    IsTransportConnection(edge.fromConnector, edge.toConnector) &&
    EdgeIsConnectedToNode(edge, node)
  );
}

/**
 * Function to verify that only one node from a connection is displayed on the screen.
 * If both nodes are visible there is no need to draw a Connected OffPageNode.
 * @param edge
 * @param isTarget
 * @returns a boolean value.
 */
function OnlyOneNodeVisible(edge: Edge, isTarget: boolean) {
  const sourceNode = isTarget ? edge.fromNode : edge.toNode;
  const targetNode = isTarget ? edge.toNode : edge.fromNode;

  const sourceNodeParent = GetParent(sourceNode);
  const targetNodeParent = GetParent(targetNode);
  const targetNodeVisible = sourceNodeParent?.id === targetNodeParent?.id;

  return !targetNodeVisible;
}
//#endregion
