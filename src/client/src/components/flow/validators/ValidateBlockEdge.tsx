import { Node, Connector } from "../../../models";
import { IsOffPage } from "../block/helpers";
import {
  IsLocation,
  IsPartOf,
  IsProduct,
  IsTransportConnection,
  IsProductConnection,
  IsLocationConnection,
  IsFunction,
} from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each Aspect.
 * @param activeNode
 * @param secondaryNode
 * @param toNode
 * @param fromNode
 * @param fromConnector
 * @param toConnector
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  activeNode: Node,
  secondaryNode: Node,
  toNode: Node,
  fromNode: Node,
  fromConnector: Connector,
  toConnector: Connector
) => {
  if (IsPartOf(fromConnector) || IsPartOf(toConnector)) return false;
  if (!secondaryNode) return validEdge(activeNode, toNode, fromNode, fromConnector, toConnector);
  if (secondaryNode) return validSecondaryEdge(activeNode, secondaryNode, fromConnector, toConnector);
};

function validEdge(activeNode: Node, toNode: Node, fromNode: Node, source: Connector, target: Connector) {
  if (IsOffPage(toNode)) return true;

  if (IsLocation(activeNode)) return IsLocationConnection(source, target) && IsLocation(toNode) && IsLocation(fromNode);
  if (IsFunction(activeNode)) return IsTransportConnection(source, target) && IsFunction(toNode) && IsFunction(fromNode);
  if (IsProduct(activeNode)) return IsTransportConnection(source, target);

  return false;
}

function validSecondaryEdge(activeNode: Node, secondaryNode: Node, source: Connector, target: Connector) {
  if (IsLocation(secondaryNode)) return IsLocationConnection(source, target);
  if (IsProduct(secondaryNode)) return IsProductConnection(source, target);

  if (IsFunction(secondaryNode)) {
    if (IsProduct(activeNode)) return IsProductConnection(source, target);
    if (IsLocation(activeNode)) return IsLocationConnection(source, target);
    return IsTransportConnection(source, target);
  }
}

export default ValidateBlockEdge;
