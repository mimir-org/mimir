import { IsConnectView } from "../helpers/block/connectView";
import { Node, Connector } from "../../../models";
import {
  IsChildOf,
  IsFunction,
  IsLocation,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../helpers/common";

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
  if (
    !fromNode ||
    !toNode ||
    IsPartOfTerminal(fromConnector) ||
    IsPartOfTerminal(toConnector)
  )
    return false;

  // Regular BlockView
  if (!splitView && !IsConnectView()) {
    if (IsFunction(selectedNode)) {
      if (
        toNode.level - selectedNode.level === 1 &&
        fromNode.level - selectedNode.level === 0 &&
        fromNode.id === selectedNode.id
      )
        return true;
      if (
        fromNode.level - selectedNode.level === 1 &&
        toNode.level - selectedNode.level === 0 &&
        toNode.id === selectedNode.id
      )
        return true;
      if (
        fromNode.level - selectedNode.level === 1 &&
        toNode.level - selectedNode.level === 1 &&
        IsChildOf(toNode, selectedNode) &&
        IsChildOf(fromNode, selectedNode)
      )
        return true;
    }
    return false;
  }

  if (IsConnectView()) {
    return (
      fromNode !== selectedNode &&
      IsTransportTerminal(fromConnector) &&
      IsTransportTerminal(toConnector) &&
      IsFunction(fromNode) &&
      IsFunction(toNode)
    );
  }

  if (splitView) {
    if (
      IsFunction(fromNode) &&
      IsFunction(toNode) &&
      !splitViewNode &&
      IsChildOf(fromNode, selectedNode)
    ) {
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

export default ValidateBlockEdge;
