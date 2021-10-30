import { Node, Connector } from "../../../models";
import { IsLocation, IsPartOf, IsProduct, IsTransportConnection, IsProductConnection, IsLocationConnection } from "../helpers";

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
  if (IsLocation(activeNode)) return IsLocationConnection(source, target);
  return IsTransportConnection(source, target);
}

function validSecondaryEdge(activeNode: Node, secondaryNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(source, target);
  if (IsProduct(secondaryNode)) return IsProductConnection(source, target);

  if (IsProduct(activeNode)) return IsProductConnection(source, target);
  if (IsLocation(activeNode)) return IsLocationConnection(source, target);
  return IsTransportConnection(source, target);
}

export default ValidateBlockEdge;
