import { Node, Connector } from "../../../models";
import {
  IsProductTerminal,
  IsFunction,
  IsLocation,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsProduct,
  IsTransportTerminal,
} from "../helpers";

/**
 * Validator for an edge in BlockView, where different rules apply for each state.
 * @param activeNode
 * @param fromNode
 * @param toNode
 * @param secondaryNode
 * @param fromConnector
 * @param toConnector
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  activeNode: Node,
  fromNode: Node,
  toNode: Node,
  secondaryNode: Node,
  fromConnector: Connector,
  toConnector: Connector
) => {
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector)) return false;
  if (!secondaryNode) return validBlockView(activeNode, fromNode, toNode, fromConnector, toConnector);
  if (secondaryNode) return validSecondaryView(activeNode, secondaryNode, fromNode, toNode, fromConnector, toConnector);
  return false;
};

function validBlockView(activeNode: Node, from: Node, to: Node, fromC: Connector, toC: Connector) {
  if (IsLocation(activeNode)) {
    return IsLocationTerminal(fromC) && IsLocationTerminal(toC);
  }

  if (IsFunction(activeNode)) {
    return IsTransportTerminal(fromC) && IsTransportTerminal(toC);
  }

  if (IsProduct(activeNode)) {
    return IsTransportTerminal(fromC) && IsTransportTerminal(toC) && IsProduct(from) && IsProduct(to);
  }
}

function validSecondaryView(activeNode: Node, secondaryNode: Node, from: Node, to: Node, fromC: Connector, toC: Connector) {
  if (IsLocation(secondaryNode)) {
    return IsLocationTerminal(fromC) && IsLocationTerminal(toC);
  }
  if (IsProduct(secondaryNode)) {
    return IsProductTerminal(fromC) && IsProductTerminal(toC);
  }

  if (IsFunction(secondaryNode)) {
    return IsTransportTerminal(fromC) && IsTransportTerminal(toC);
  }
}

export default ValidateBlockEdge;
