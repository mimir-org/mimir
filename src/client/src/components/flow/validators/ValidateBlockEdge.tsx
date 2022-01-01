import { IsFunction, IsLocation, IsProduct, IsDirectChild, IsAspectNode, IsOffPage } from "../../../helpers";
import { Node, Connector } from "../../../models";
import { IsTransportConnection, IsProductConnection, IsLocationConnection, IsPartOf } from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each Aspect.
 * @param selectedNode
 * @param secondaryNode
 * @param fromNode
 * @param toNode
 * @param source
 * @param target
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  selectedNode: Node,
  secondaryNode: Node,
  fromNode: Node,
  toNode: Node,
  source: Connector,
  target: Connector
) => {
  if (!secondaryNode) {
    if (IsOffPage(fromNode)) return validateOffPageSourceEdge(toNode, selectedNode, source, target);
    if (IsOffPage(toNode)) return validateOffPageTargetEdge(fromNode, toNode, selectedNode, source, target);
    return validateEdge(selectedNode, fromNode, toNode, source, target);
  }
  if (secondaryNode) {
    if (IsOffPage(toNode)) return !toNode.isConnectedOffPage;
    if (IsOffPage(fromNode)) return !fromNode.isConnectedOffPage;
    return validateSecondaryEdge(selectedNode, secondaryNode, fromNode, source, target);
  }
};

function validateEdge(selectedNode: Node, fromNode: Node, toNode: Node, source: Connector, target: Connector) {
  if (IsProduct(selectedNode) && IsProduct(toNode)) {
    if (IsPartOf(source)) if (IsAspectNode(fromNode) || IsAspectNode(toNode) || selectedNode.id === fromNode.id) return false;
    return true;
  }

  if (!IsDirectChild(fromNode, selectedNode) || !IsDirectChild(toNode, selectedNode)) return false;
  if (IsProduct(selectedNode)) return (IsTransportConnection(source, target) || IsPartOf(source)) && IsProduct(fromNode);
  if (IsLocation(selectedNode)) return IsLocationConnection(source, target) && IsLocation(fromNode);

  return IsTransportConnection(source, target) && IsFunction(fromNode);
}

function validateSecondaryEdge(selectedNode: Node, secondaryNode: Node, fromNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(source, target) && IsDirectChild(fromNode, selectedNode);
  if (IsProduct(secondaryNode)) return IsProductConnection(source, target) && IsDirectChild(fromNode, selectedNode);

  if (IsFunction(secondaryNode)) {
    if (IsProduct(selectedNode)) return IsProductConnection(source, target) && IsDirectChild(fromNode, secondaryNode);
    if (IsLocation(selectedNode)) return IsLocationConnection(source, target) && IsDirectChild(fromNode, secondaryNode);
    return IsTransportConnection(source, target);
  }
}

function validateOffPageSourceEdge(toNode: Node, selectedNode: Node, source: Connector, target: Connector) {
  return IsTransportConnection(source, target) && IsDirectChild(toNode, selectedNode);
}
function validateOffPageTargetEdge(fromNode: Node, toNode: Node, selectedNode: Node, source: Connector, target: Connector) {
  return IsTransportConnection(source, target) && IsDirectChild(fromNode, selectedNode) && IsDirectChild(toNode, fromNode);
}

export default ValidateBlockEdge;
