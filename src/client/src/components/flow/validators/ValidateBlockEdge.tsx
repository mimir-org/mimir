import { IsConnectView } from "../block/connectView/helpers";
import { Node, Connector } from "../../../models";
import { IsDirectChild } from "../block/helpers";
import {
  IsChildOf,
  IsFamily,
  IsFulfilledByTerminal,
  IsFunction,
  IsLocation,
  IsLocationTerminal,
  IsProduct,
  IsSiblingNodes,
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
  if (!IsConnectView()) return validBlockView(activeNode, fromNode, toNode);
  // if (splitView) return validSplitView(activeNode, secondaryNode, fromNode, toNode, fromConnector, toConnector);
  if (IsConnectView()) return validConnectView(activeNode, fromNode, toNode, fromConnector, toConnector);
  return false;
};

function validBlockView(active: Node, from: Node, to: Node) {
  if (!IsLocation(active)) return IsSiblingNodes(from, to) && IsChildOf(to, active) && IsChildOf(from, active);
}

function validSplitView(activeNode: Node, splitNode: Node, from: Node, to: Node, fromC: Connector, toC: Connector) {
  if (!splitNode) return IsSiblingNodes(from, to) && IsChildOf(from, activeNode);

  if (splitNode && !IsLocation(splitNode)) {
    return (
      IsDirectChild(from, activeNode) &&
      IsDirectChild(to, activeNode) &&
      IsDirectChild(from, splitNode) &&
      IsDirectChild(to, splitNode) &&
      IsFulfilledByTerminal(fromC) &&
      IsFulfilledByTerminal(toC)
    );
  }

  if (IsLocation(splitNode)) {
    return (
      IsLocation(to) &&
      IsLocationTerminal(fromC) &&
      IsLocationTerminal(toC) &&
      IsFamily(from, activeNode) &&
      IsDirectChild(from, activeNode) &&
      IsDirectChild(to, activeNode) &&
      IsDirectChild(from, splitNode) &&
      IsDirectChild(to, splitNode)
    );
  }
}

function validConnectView(activeNode: Node, fromNode: Node, toNode: Node, fromConn: Connector, toConn: Connector) {
  return (
    (fromNode !== activeNode &&
      IsTransportTerminal(fromConn) &&
      IsTransportTerminal(toConn) &&
      IsFunction(fromNode) &&
      IsFunction(toNode)) ||
    (IsProduct(fromNode) && IsProduct(toNode))
  );
}

export default ValidateBlockEdge;
