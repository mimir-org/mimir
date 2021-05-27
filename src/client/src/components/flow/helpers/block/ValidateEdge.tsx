import { Node, Connector } from "../../../../models/project";
import {
  IsFunctionNode,
  IsLocationNode,
  IsTransportTerminal,
  IsLocationTerminal,
  IsAspectNode,
  IsPartOfTerminal,
} from "..";

const ValidateEdge = (
  selectedNode: Node,
  selectedBlockNode: Node,
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
): boolean => {
  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
    return false;

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
    if (IsFunctionNode(selectedNode)) {
      if (
        IsLocationNode(fromNode) ||
        IsLocationNode(toNode) ||
        IsLocationTerminal(fromConnector) ||
        IsLocationTerminal(toConnector) ||
        IsAspectNode(selectedNode.type) ||
        IsAspectNode(fromNode.type) ||
        toNode === selectedNode ||
        fromNode === selectedNode
      )
        return false;
      else return true;
    }
  }

  if (splitView) {
    if (!splitViewNode) {
      if (IsFunctionNode(fromNode) && IsFunctionNode(toNode)) return true;
    }
    if (
      toNode === selectedBlockNode ||
      fromNode === selectedBlockNode ||
      toNode === selectedNode ||
      fromNode === selectedNode
    ) {
      return false;
    }
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
