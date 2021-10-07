import { IsConnectView } from "../block/connectView/helpers";
import { Node, Connector } from "../../../models";
import { IsChildOf, IsFunction, IsLocation, IsPartOfTerminal, IsTransportTerminal } from "../helpers";

/**
 * Component to validate and display an edge in BlockView
 * @param selectedNode
 * @param fromNode
 * @param toNode
 * @param splitViewNode
 * @param fromConnector
 * @param toConnector
 * @param splitView
 * @returns a boolean value
 */
const ValidateBlockEdge = (
  selectedNode: Node,
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
) => {
  if (!fromNode || !toNode || IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector)) return false;

  // TODO: refactor this shit

  // Regular BlockView
  if (!splitView && !IsConnectView()) {
    if (IsFunction(selectedNode)) validateNodeLevel(toNode, fromNode, selectedNode);
  }

  if (IsConnectView()) {
    validateConnectView(fromNode, toNode, selectedNode, fromConnector, toConnector);
  }

  if (splitView) {
    if (IsFunction(fromNode) && IsFunction(toNode) && !splitViewNode && IsChildOf(fromNode, selectedNode)) {
      return false;
    }
    if (
      IsFunction(fromNode) &&
      IsLocation(toNode) &&
      IsChildOf(fromNode, selectedNode) &&
      IsChildOf(toNode, splitViewNode) &&
      splitViewNode
    )
      return true;
  }
  return false;
};

function validateNodeLevel(toNode: Node, fromNode: Node, selectedNode: Node) {
  return (
    (toNode.level - selectedNode.level === 1 &&
      fromNode.level - selectedNode.level === 0 &&
      fromNode.id === selectedNode.id) ||
    (fromNode.level - selectedNode.level === 1 &&
      toNode.level - selectedNode.level === 0 &&
      toNode.id === selectedNode.id) ||
    (fromNode.level - selectedNode.level === 1 &&
      toNode.level - selectedNode.level === 1 &&
      IsChildOf(toNode, selectedNode) &&
      IsChildOf(fromNode, selectedNode))
  );
}

function validateConnectView(
  fromNode: Node,
  toNode: Node,
  selectedNode: Node,
  fromConnector: Connector,
  toConnector: Connector
) {
  return (
    fromNode !== selectedNode &&
    IsTransportTerminal(fromConnector) &&
    IsTransportTerminal(toConnector) &&
    IsFunction(fromNode) &&
    IsFunction(toNode)
  );
}

export default ValidateBlockEdge;
