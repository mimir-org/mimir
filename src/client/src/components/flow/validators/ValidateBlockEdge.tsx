import { Elements } from "react-flow-renderer";
import { IsFunction, IsLocation, IsProduct, IsOffPage } from "../../../helpers";
import { Node, Connector } from "../../../models";
import { IsTransportConnection, IsProductConnection, IsLocationConnection } from "../helpers";

/**
 * Validator for an edge in BlockView. The basis for drawing an edge in BlockView is that the source node
 * and the target node are in the elements array - meaning that the nodes are drawn to the screen.
 * @param selectedNode
 * @param splitNode
 * @param fromNode
 * @param toNode
 * @param source
 * @param target
 * @param elements
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  selectedNode: Node,
  splitNode: Node,
  fromNode: Node,
  toNode: Node,
  source: Connector,
  target: Connector,
  elements: Elements<any>
) => {
  const splitView = splitNode !== null;
  const isFromNodeOnScreen = elements.some((elem) => elem.id === fromNode.id);
  const isToNodeOnScreen = elements.some((elem) => elem.id === toNode.id);

  if (splitView) {
    return isFromNodeOnScreen && isToNodeOnScreen && validateSplitView(selectedNode, splitNode, fromNode, toNode, source, target);
  }

  return isFromNodeOnScreen && isToNodeOnScreen;
};

function validateSplitView(
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
