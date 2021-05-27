import { Node, Connector } from "../../../../models/project";
import {
  IsFunctionNode,
  IsLocationNode,
  IsTransportTerminal,
  IsLocationTerminal,
  IsAspectNode,
} from "..";

const ValidateEdge = (
  selectedNode: Node,
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
): boolean => {
  if (!fromNode || !toNode) return false;

  if (!splitView) {
    // When Location
    if (IsLocationNode(selectedNode)) {
      if (
        IsFunctionNode(fromNode) ||
        IsFunctionNode(toNode) ||
        IsTransportTerminal(fromConnector) ||
        IsTransportTerminal(toConnector)
      ) {
        return false;
      }
    }
    // When Function
    if (IsFunctionNode(selectedNode) || !IsAspectNode(selectedNode.type)) {
      if (
        IsLocationNode(fromNode) ||
        IsLocationNode(toNode) ||
        IsLocationTerminal(fromConnector) ||
        IsLocationTerminal(toConnector)
      )
        return false;
      else return true;
    }
  }
  if (splitView) {
    if (!splitViewNode) {
      if (IsFunctionNode(fromNode) && IsFunctionNode(toNode)) return true;
    }
    if (IsTransportTerminal(fromConnector)) return false;
    if (
      IsFunctionNode(fromNode) &&
      IsLocationNode(toNode) &&
      IsLocationNode(splitViewNode) &&
      toNode !== selectedNode
    ) {
      return true;
    }
  }
  return false;
};

export default ValidateEdge;
