import red from "../../../../redux/store";
import { IsConnectView } from "./connectView";
import { Node, Connector } from "../../../../models";
import {
  IsAspectNode,
  IsChildOf,
  IsFunction,
  IsLocation,
  IsPartOfTerminal,
  IsTransportTerminal,
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
  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
    return false;

  //   const connectChildren = red.store.getState().connectView
  //     ?.connectNodes as Node[];

  //   if (IsConnectView()) {
  //     if (
  //       fromNode !== selectedNode &&
  //       IsTransportTerminal(fromConnector) &&
  //       connectChildren.some((node) => node.id === fromNode.id) &&
  //       connectChildren.some((node) => node.id === toNode.id)
  //     )
  //       return true;
  //     return false;
  //   }

  if (!splitView && !IsConnectView()) {
    if (IsFunction(selectedNode)) {
      if (IsAspectNode(selectedNode)) return false;
      if (IsLocation(fromNode) || IsLocation(toNode)) return false;
      if (selectedNode === toNode || selectedNode === fromNode) return false;
      if (!IsChildOf(fromNode, selectedNode)) return false;
      return true;
    }
    return false;
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
