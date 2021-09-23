import { IsConnectView } from "../helpers/block/connectView";
import { Node, Connector } from "../../../models";
import {
  IsChildOf,
  IsFunction,
  IsLocation,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../helpers/common";

/** Component to validate each edge in BlockView. Each mode - splitView,connectView - has different rules */
const ValidateBlockEdge = (
  selectedNode: Node,
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
) => {
  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
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

  //   if (IsConnectView()) {
  //     if (
  //       fromNode !== selectedNode &&
  //       IsTransportTerminal(fromConnector) &&
  //       IsTransportTerminal(toConnector) &&
  //       IsFunction(fromNode) &&
  //       IsFunction(toNode)
  //     )
  //       return true;
  //     return false;
  //   }

  //   if (splitView) {
  //     if (
  //       IsFunction(fromNode) &&
  //       IsFunction(toNode) &&
  //       !splitViewNode &&
  //       IsChildOf(fromNode, selectedNode)
  //     ) {
  //       return false;
  //     }
  //     if (
  //       IsFunction(fromNode) &&
  //       IsLocation(toNode) &&
  //       IsChildOf(fromNode, selectedNode) &&
  //       IsChildOf(toNode, splitViewNode) &&
  //       splitViewNode
  //     )
  //       return true;
  //   }
  return true;
};

export default ValidateBlockEdge;
