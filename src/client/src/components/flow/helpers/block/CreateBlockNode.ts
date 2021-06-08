import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsFunctionNode, IsLocationNode } from "../common";
import { Size } from "../../../../componentLibrary";
import { SetConnectNodePosition } from "./connectionView";

const CreateBlockNode = (
  node: Node,
  splitView: boolean,
  mainConnectNode: Node
): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;

  const type = IsLocationNode(node) ? "BlockLocationNode" : "BlockFunctionNode";

  // Force node to fit Block
  let position = SetBlockNodePosition(node, splitView);
  if (mainConnectNode && !IsLocationNode(node) && node !== mainConnectNode) {
    position = SetConnectNodePosition(node);
  }

  if (IsFunctionNode(node)) {
    if (mainConnectNode && mainConnectNode.id === node.id) {
      node.width = Size.ConnectView_Width;
      node.length = Size.ConnectView_Length;
    } else {
      node.width = Size.Node_Width;
      node.length = Size.Node_Length;
    }
  }

  blockNode = {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  };

  return blockNode;
};

export default CreateBlockNode;
