import { Node, Connector } from "../../../models";
import { IsProductTerminal, IsFunction, IsLocation, IsLocationTerminal, IsPartOf, IsProduct, IsTransport } from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each Aspect.
 * @param activeNode
 * @param secondaryNode
 * @param fromConnector
 * @param toConnector
 * @returns a boolean value.
 */
const ValidateBlockEdge = (activeNode: Node, secondaryNode: Node, fromConnector: Connector, toConnector: Connector) => {
  if (IsPartOf(fromConnector) || IsPartOf(toConnector)) return false;
  if (secondaryNode) return validSecondaryEdge(activeNode, secondaryNode, fromConnector, toConnector);
  return validEdge(activeNode, fromConnector, toConnector);
};

function validEdge(activeNode: Node, source: Connector, target: Connector) {
  if (IsLocation(activeNode)) return IsLocationTerminal(source) && IsLocationTerminal(target);
  if (IsFunction(activeNode)) return IsTransport(source) && IsTransport(target);
  if (IsProduct(activeNode)) return IsTransport(source) && IsTransport(target);
}

function validSecondaryEdge(activeNode: Node, secondaryNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationTerminal(source) && IsLocationTerminal(target);
  if (IsProduct(secondaryNode)) return IsProductTerminal(source) && IsProductTerminal(target);
  if (IsFunction(secondaryNode)) return IsTransport(source) && IsTransport(target);
}

export default ValidateBlockEdge;
