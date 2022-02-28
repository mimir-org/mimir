import { IsFamily, IsFunction, IsLocation, IsOffPage, IsProduct } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { IsLocationConnection, IsProductConnection, IsTransportConnection } from "../../../helpers";

/**
 * Validator for an edge in BlockView. The basis for drawing an edge in BlockView is that the source node
 * and the target node are in the elements array - meaning that the nodes are drawn to the screen.
 * @param selectedNode
 * @param splitNode
 * @param sourceNode
 * @param targetNode
 * @param sourceConn
 * @param targetConn
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  selectedNode: Node,
  splitNode: Node,
  sourceNode: Node,
  targetNode: Node,
  sourceConn: Connector,
  targetConn: Connector
) => {
  const splitView = splitNode !== null;
  if (splitView) return ValidateSplitView(selectedNode, splitNode, sourceNode, targetNode, sourceConn, targetConn);
  return ValidateSingleView(sourceNode, targetNode, sourceConn, targetConn);
};

function ValidateSingleView(sourceNode: Node, targetNode: Node, sourceConn: Connector, targetConn: Connector) {
  if (!IsFamily(sourceNode, targetNode)) return false;
  if (!IsTransportConnection(sourceConn, targetConn)) return false;
  return true;
}

function ValidateSplitView(
  selectedNode: Node,
  splitNode: Node,
  fromNode: Node,
  toNode: Node,
  source: Connector,
  target: Connector
) {
  if (IsLocation(selectedNode)) {
    if (IsProduct(splitNode)) return IsProductConnection(source, target);
    if (IsFunction(splitNode)) return IsTransportConnection(source, target);
    return IsLocationConnection(source, target);
  }
  if (IsProduct(selectedNode)) {
    if (IsLocation(splitNode)) return IsLocationConnection(source, target);
    if (IsFunction(splitNode)) return IsTransportConnection(source, target);
    return IsProductConnection(source, target);
  }

  if (IsProduct(splitNode)) return IsProductConnection(source, target);
  if (IsLocation(splitNode)) return IsLocationConnection(source, target);
  if (IsFunction(splitNode)) return IsTransportConnection(source, target) || IsOffPage(fromNode) || IsOffPage(toNode);
}

export default ValidateBlockEdge;
