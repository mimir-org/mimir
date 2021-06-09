import { Node, Connector } from "../../../../models/project";
import red from "../../../../redux/store";
import { IsFunctionNode, IsLocationNode, IsPartOfTerminal } from "../common";

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
      if (!hasConnectNode)
        if (fromNode.level - selectedNode.level !== 1) return false;
      return true;
    }
  }

  if (splitView) {
    if (!splitViewNode && IsFunctionNode(fromNode) && IsFunctionNode(toNode))
      return true;
    if (
      IsFunctionNode(fromNode) &&
      IsLocationNode(toNode) &&
      IsLocationNode(splitViewNode)
    )
      return true;
  }
  return false;
};

export default ValidateBlockEdge;
