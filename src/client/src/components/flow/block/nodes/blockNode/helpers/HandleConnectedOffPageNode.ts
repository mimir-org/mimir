import { Dispatch } from "redux";
import { CreateConnectedOffPageNode } from "./CreateConnectedOffPageNode";
import { IsOffPage } from "../../../../../../helpers/Aspects";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsTransportConnection } from "../../../../helpers/Connectors";
import { IsOffPageEdge } from "../../../helpers/IsOffPageEdge";

/**
 * Component to draw an OffPageNode that is connected.
 * This occurs if a targetNode or a sourceNode to a tranport edge is not displayed on the screen.
 * The OffPageNode is only a visual element, and is not part of the project's data model.
 * This component is called from the BlockNode component.
 * @param node
 * @param nodes
 * @param edges
 * @param size
 * @param dispatch
 */
export const HandleConnectedOffPageNode = (node: Node, nodes: Node[], edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  if (!node || !nodes.length || !edges.length) return;

  edges.forEach((edge) => {
    if (!IsValidTransport(edge, node.id)) return;
    const isTarget = edge.toNodeId === node.id;
    if (!OnlyOneNodeVisible(edge, isTarget) || HasConnectedOffPageNode(edges, edge, isTarget)) return;

    const nodeParent = nodes.find((n) => n.id === node.parentNodeId);
    if (!nodeParent) return;

    const xPos = isTarget ? nodeParent.positionBlockX : size.width;
    const connector = node.connectors.find((c) => (isTarget ? c.id === edge.toConnectorId : c.id === edge.fromConnectorId));
    const position = { x: xPos, y: node.positionBlockY };

    CreateConnectedOffPageNode(node, connector, position, dispatch);
  });
};

/**
 * Function to verify if an edge is a valid transport edge.
 * @param edge
 * @param nodeId
 * @returns a boolean value.
 */
function IsValidTransport(edge: Edge, nodeId: string) {
  const isTransport = IsTransportConnection(edge.fromConnector, edge.toConnector);
  const isNotOffPageTransport = IsOffPageEdge(edge);
  const nodeHasEdge = nodeId === edge.fromNodeId || nodeId === edge.toNodeId;

  return isTransport && isNotOffPageTransport && nodeHasEdge;
}

/**
 * Function to check if a connected OffPageNode for an edge already exists.
 * @param edges
 * @param edge
 * @param isTargetNode
 * @returns a boolean value.
 */
function HasConnectedOffPageNode(edges: Edge[], edge: Edge, isTargetNode: boolean) {
  const existingEdge = isTargetNode
    ? edges.find((e) => IsOffPage(e.fromNode) && e.toConnectorId === edge.toConnectorId)
    : edges.find((e) => IsOffPage(e.toNode) && e.fromConnectorId === edge.fromConnectorId);

  return existingEdge !== undefined;
}

/**
 * Function to verify that only one node from a connection is displayed on the screen.
 * If the sourceNode and the targetNode has the same parent, both nodes will be visible.
 * If both nodes are visible there is no need to draw a Connected OffPageNode.
 * @param edge
 * @param isTarget
 * @returns a boolean value.
 */
function OnlyOneNodeVisible(edge: Edge, isTarget: boolean) {
  const sourceNode = isTarget ? edge.fromNode : edge.toNode;
  const targetNode = isTarget ? edge.toNode : edge.fromNode;

  const nodesHaveSameParent = sourceNode?.parentNodeId === targetNode?.parentNodeId;

  return !nodesHaveSameParent;
}
