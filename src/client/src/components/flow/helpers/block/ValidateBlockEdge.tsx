import { Node, Connector } from "../../../../models/project";
import red from "../../../../redux/store";
import {
  IsChildOf,
  IsFunctionNode,
  IsLocationNode,
  IsPartOfTerminal,
} from "../common";

const ValidateBlockEdge = (
  selectedNode: Node,
  fromNode: Node,
  toNode: Node,
  splitViewNode: Node,
  fromConnector: Connector,
  toConnector: Connector,
  splitView: boolean
): boolean => {
  const connectNode = red.store.getState().connectView.mainNode as Node;
  const hasConnectNode = connectNode !== null;

  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
    return false;

  if (!splitView) {
    if (IsFunctionNode(selectedNode)) {
      if (IsLocationNode(fromNode) || IsLocationNode(toNode)) return false;
      if (selectedNode === toNode || selectedNode === fromNode) return false;
      if (!IsChildOf(fromNode, selectedNode)) return false;
      if (!hasConnectNode)
        if (fromNode.level - selectedNode.level !== 1) return false;
      return true;
    }
  }

  if (splitView) {
    if (
      IsFunctionNode(fromNode) &&
      IsFunctionNode(toNode) &&
      !splitViewNode &&
      IsChildOf(fromNode, selectedNode)
    ) {
      return true;
    }
    if (
      IsFunctionNode(fromNode) &&
      IsLocationNode(toNode) &&
      IsChildOf(fromNode, selectedNode) &&
      IsChildOf(toNode, splitViewNode) &&
      splitViewNode
    )
      return true;
  }
  return false;
};

export default ValidateBlockEdge;
