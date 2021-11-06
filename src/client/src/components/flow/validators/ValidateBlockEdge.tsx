import { IsFunction, IsLocation, IsProduct, IsDirectChild } from "../../../helpers";
import { Node, Connector } from "../../../models";
import { IsTransportConnection, IsProductConnection, IsLocationConnection } from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each Aspect.
 * @param selectedNode
 * @param secondaryNode
 * @param fromNode
 * @param source
 * @param target
 * @returns a boolean value.
 */
const ValidateBlockEdge = (selectedNode: Node, secondaryNode: Node, fromNode: Node, source: Connector, target: Connector) => {
  if (!secondaryNode) return validEdge(selectedNode, fromNode, source, target);
  if (secondaryNode) return validSecondaryEdge(selectedNode, secondaryNode, fromNode, source, target);
};

function validEdge(selectedNode: Node, fromNode: Node, source: Connector, target: Connector) {
  if (!IsDirectChild(fromNode, selectedNode)) return false;
  if (IsProduct(selectedNode)) return IsTransportConnection(source, target) && IsProduct(fromNode);
  if (IsLocation(selectedNode)) return IsLocationConnection(source, target) && IsLocation(fromNode);
  return IsTransportConnection(source, target) && IsFunction(fromNode);
}

function validSecondaryEdge(selectedNode: Node, secondaryNode: Node, fromNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(source, target) && IsDirectChild(fromNode, selectedNode);
  if (IsProduct(secondaryNode)) return IsProductConnection(source, target) && IsDirectChild(fromNode, selectedNode);

  if (IsFunction(secondaryNode)) {
    if (IsProduct(selectedNode)) return IsProductConnection(source, target) && IsDirectChild(fromNode, secondaryNode);
    if (IsLocation(selectedNode)) return IsLocationConnection(source, target) && IsDirectChild(fromNode, secondaryNode);
    return IsTransportConnection(source, target);
  }
}

export default ValidateBlockEdge;
