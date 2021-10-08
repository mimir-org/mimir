import { IsConnectView } from "../block/connectView/helpers";
import { Node, Connector } from "../../../models";
import { IsChildOf, IsFunction, IsLocation, IsProduct, IsSiblingNodes, IsTransportTerminal } from "../helpers";

/**
 * Component to validate an edge in BlockView, where different rules apply for different states.
 * @param activeNode
 * @param fromNode
 * @param toNode
 * @param splitNode
 * @param fromConnector
 * @param toConnector
 * @param splitView
 * @returns a boolean value
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
  if (splitView) return validSplitView(activeNode, splitNode, fromNode, toNode);
  if (IsConnectView()) return validConnectView(activeNode, fromNode, toNode, fromConnector, toConnector);
  return false;
};

function validBlockView(activeNode: Node, fromNode: Node, toNode: Node) {
  if (!IsLocation(activeNode))
    return IsSiblingNodes(fromNode, toNode) && IsChildOf(toNode, activeNode) && IsChildOf(fromNode, activeNode);
}

function validSplitView(activeNode: Node, splitNode: Node, fromNode: Node, toNode: Node) {
  if (splitNode && !IsLocation(splitNode))
    return (
      (IsFunction(fromNode) && IsProduct(toNode)) ||
      (IsProduct(fromNode) && IsFunction(toNode)) ||
      IsSiblingNodes(fromNode, toNode)
    );

  if (splitNode && IsLocation(splitNode)) return !IsLocation(fromNode) && IsLocation(toNode);
  if (!splitNode) return IsSiblingNodes(fromNode, toNode) && IsChildOf(fromNode, activeNode);
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
