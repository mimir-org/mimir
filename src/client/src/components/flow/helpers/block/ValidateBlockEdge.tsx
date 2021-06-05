import { Node, Connector } from "../../../../models/project";
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
  if (!fromNode || !toNode) return false;
  if (IsPartOfTerminal(fromConnector) || IsPartOfTerminal(toConnector))
    return false;

  if (IsFunctionNode(selectedNode)) {
    if (IsLocationNode(fromNode)) return false;
    if (IsLocationNode(toNode) && !splitView) return false;
    if (selectedNode === toNode || selectedNode === fromNode) return false;
    if (fromNode.level - selectedNode.level !== 1) return false;
    if (toNode?.level - splitViewNode?.level !== 1) return false;
    return true;
  }
  return false;
};

export default ValidateBlockEdge;
