import { IsConnectView } from "../block/connectView/helpers";
import { Node, Connector } from "../../../models";
import {
  IsChildOf,
  IsFunction,
  IsLocation,
  IsLocationTerminal,
  IsProduct,
  IsSiblingNodes,
  IsTransportTerminal,
} from "../helpers";

/**
 * Component to validate an edge in BlockView, where different rules apply for each state.
 * @param activeNode
 * @param fromNode
 * @param toNode
 * @param splitNode
 * @param fromConnector
 * @param toConnector
 * @param splitView
 * @returns a boolean value.
 */
const ValidateBlockEdge = (
  activeNode: Node,
  fromNode: Node,
  toNode: Node,
  splitNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
) => {
  if (!splitView && !IsConnectView()) return validBlockView(activeNode, fromNode, toNode);
  if (splitView) return validSplitView(activeNode, splitNode, fromNode, toNode, fromConnector, toConnector);
  if (IsConnectView()) return validConnectView(activeNode, fromNode, toNode, fromConnector, toConnector);
  return false;
};

function validBlockView(active: Node, from: Node, to: Node) {
  if (!IsLocation(active)) return IsSiblingNodes(from, to) && IsChildOf(to, active) && IsChildOf(from, active);
}

function validSplitView(activeNode: Node, split: Node, from: Node, to: Node, fromC: Connector, toC: Connector) {
  if (!split) return IsSiblingNodes(from, to) && IsChildOf(from, activeNode);

  if (split && !IsLocation(split)) {
    return (
      from.level - activeNode.level === 1 &&
      to.level - activeNode.level === 1 &&
      from.level - split.level === 1 &&
      to.level - split.level === 1 &&
      IsTransportTerminal(fromC) &&
      IsTransportTerminal(toC)
    );
  }

  if (IsLocation(split)) {
    return (
      IsLocation(to) &&
      IsLocationTerminal(fromC) &&
      IsLocationTerminal(toC) &&
      from.aspect === activeNode.aspect &&
      from.level - activeNode.level === 1 &&
      to.level - activeNode.level === 1 &&
      from.level - split.level === 1 &&
      to.level - split.level === 1
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
