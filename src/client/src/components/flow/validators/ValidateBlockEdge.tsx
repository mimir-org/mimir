import { Node, Connector } from "../../../models";
import { IsDirectChild } from "../block/helpers";
import { IsLocation, IsProduct, IsTransportConnection, IsProductConnection, IsLocationConnection, IsFunction } from "../helpers";

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
  if (secondaryNode) return validSecondaryEdge(selectedNode, secondaryNode, source, target);
};

function validEdge(selectedNode: Node, fromNode: Node, source: Connector, target: Connector) {
  if (!IsDirectChild(fromNode, selectedNode)) return false;
  if (IsProduct(selectedNode)) return IsTransportConnection(source, target) && IsProduct(fromNode);
  if (IsLocation(selectedNode)) return IsLocationConnection(source, target) && IsLocation(fromNode);
  return IsTransportConnection(source, target) && IsFunction(fromNode);
}

function validSecondaryEdge(selectedNode: Node, secondaryNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(source, target);
  if (IsProduct(secondaryNode)) return IsProductConnection(source, target);

  if (IsFunction(secondaryNode)) {
    if (IsProduct(selectedNode)) return IsProductConnection(source, target);
    if (IsLocation(selectedNode)) return IsLocationConnection(source, target);
    return IsTransportConnection(source, target);
  }
}

export default ValidateBlockEdge;
