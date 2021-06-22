import red from "../../../../redux/store";
import { Node, Connector } from "../../../../models";
import {
  IsAspectNode,
  IsChildOf,
  IsFunction,
  IsLocation,
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
) => {
  const connectNodes = red.store.getState().connectView.mainNodes;
  const hasConnectNode = connectNodes.length > 0;

  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
    return false;

  if (hasConnectNode) {
    return true; // TODO: fix guards
  }

  if (!splitView && !hasConnectNode) {
    if (IsFunction(selectedNode)) {
      if (IsAspectNode(selectedNode)) return false;
      if (IsLocation(fromNode) || IsLocation(toNode)) return false;
      if (selectedNode === toNode || selectedNode === fromNode) return false;
      if (!IsChildOf(fromNode, selectedNode)) return false;
      return true;
    }
  }

  if (splitView) {
    if (
      IsFunction(fromNode) &&
      IsFunction(toNode) &&
      !splitViewNode &&
      IsChildOf(fromNode, selectedNode)
    ) {
      return true;
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
