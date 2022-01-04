import { IsFunction, IsLocation, IsProduct, IsOffPage } from "../../../helpers";
import { Node, Connector } from "../../../models";
import { IsTransportConnection, IsProductConnection, IsLocationConnection } from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each Aspect.
 * @param selectedNode
 * @param secondaryNode
 * @param fromNode
 * @param toNode
 * @param source
 * @param target
 * @param elements
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  selectedNode: Node,
  secondaryNode: Node,
  fromNode: Node,
  toNode: Node,
  source: Connector,
  target: Connector,
  elements: any[]
) => {
  const splitView = secondaryNode !== null;
  const hasFromNode = elements.some((elem) => elem.id === fromNode.id);
  const hasToNode = elements.some((elem) => elem.id === toNode.id);

  if (splitView) {
    return hasFromNode && hasToNode && validateSplitView(selectedNode, secondaryNode, fromNode, toNode, source, target);
  }
  return hasFromNode && hasToNode;
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

// function validateOffPageSourceEdge(toNode: Node, selectedNode: Node, source: Connector, target: Connector) {
//   return IsTransportConnection(source, target) && IsDirectChild(toNode, selectedNode);
// }
// function validateOffPageTargetEdge(fromNode: Node, toNode: Node, selectedNode: Node, source: Connector, target: Connector) {
//   return IsTransportConnection(source, target) && IsDirectChild(fromNode, selectedNode) && IsDirectChild(toNode, fromNode);
// }

export default ValidateBlockEdge;
