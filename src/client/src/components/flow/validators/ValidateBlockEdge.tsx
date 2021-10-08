import { IsConnectView } from "../block/connectView/helpers";
import { Node, Connector } from "../../../models";
import {
  IsChildOf,
  IsFunction,
  IsLocation,
  IsPartOfTerminal,
  IsProduct,
  IsSiblingNodes,
  IsTransportTerminal,
} from "../helpers";

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

  // Regular BlockView
  if (!splitView && !IsConnectView())
    if (!IsLocation(selectedNode)) {
      if (IsSiblingNodes(fromNode, toNode) && IsChildOf(toNode, selectedNode) && IsChildOf(fromNode, selectedNode))
        return true;
    }

  if (IsConnectView()) {
    return (
      (fromNode !== selectedNode &&
        IsTransportTerminal(fromConnector) &&
        IsTransportTerminal(toConnector) &&
        IsFunction(fromNode) &&
        IsFunction(toNode)) ||
      (IsProduct(fromNode) && IsProduct(toNode))
    );
  }

  if (splitView) {
    if (splitViewNode && !IsLocation(splitViewNode)) {
      if (IsFunction(fromNode) && IsProduct(toNode)) return true;
      if (IsProduct(fromNode) && IsFunction(toNode)) return true;
      if (IsSiblingNodes(fromNode, toNode)) return true;
    }

    if (splitViewNode && IsLocation(splitViewNode)) if (!IsLocation(fromNode) && IsLocation(toNode)) return true;
    if (!splitViewNode) if (IsSiblingNodes(fromNode, toNode) && IsChildOf(fromNode, selectedNode)) return true;
  }
  return false;
};

export default ValidateBlockEdge;
