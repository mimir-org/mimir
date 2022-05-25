import { IsFunction, IsLocation, IsOffPage, IsProduct } from "../../../../../helpers/Aspects";
import { Connector, Node } from "../../../../../models";
import { IsLocationConnection, IsProductConnection, IsTransportConnection } from "../../../helpers/Connectors";

/**
 * Validator for an edge in SplitView. The basis for drawing an edge in BlockView is that the source node
 * and the target node are in the elements array - meaning that the nodes are drawn to the screen.
 * @param selectedBlockNode
 * @param secondaryNode
 * @param sourceNode
 * @param targetNode
 * @param sourceConn
 * @param targetConn
 * @returns a boolean value.
 */
const ValidateSplitViewEdge = (
  selectedBlockNode: Node,
  secondaryNode: Node,
  sourceNode: Node,
  targetNode: Node,
  sourceConn: Connector,
  targetConn: Connector
) => {
  if (IsLocation(selectedBlockNode)) return ValidateLocation(sourceConn, targetConn);
  if (IsProduct(selectedBlockNode)) return ValidateProduct(secondaryNode, sourceConn, targetConn);
  if (IsFunction(selectedBlockNode)) return ValidateFunction(secondaryNode, sourceNode, targetNode, sourceConn, targetConn);
};

function ValidateLocation(sourceConn: Connector, targetConn: Connector) {
  return IsLocationConnection(sourceConn, targetConn);
}

function ValidateProduct(secondaryNode: Node, sourceConn: Connector, targetConn: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(sourceConn, targetConn);
  if (IsFunction(secondaryNode)) return IsTransportConnection(sourceConn, targetConn);
  if (IsProduct(secondaryNode)) return IsTransportConnection(sourceConn, targetConn);
}

function ValidateFunction(secondaryNode: Node, sourceNode: Node, targetNode: Node, sourceConn: Connector, targetConn: Connector) {
  if (IsProduct(secondaryNode)) return IsProductConnection(sourceConn, targetConn);
  if (IsLocation(secondaryNode)) return IsLocationConnection(sourceConn, targetConn);
  if (IsFunction(secondaryNode))
    return IsTransportConnection(sourceConn, targetConn) || IsOffPage(sourceNode) || IsOffPage(targetNode);
}

export default ValidateSplitViewEdge;
