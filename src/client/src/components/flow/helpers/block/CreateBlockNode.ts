import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsFunction, IsLocation } from "../common";
import { Size } from "../../../../compLibrary";
import { IsMainConnectNode, SetConnectNodePosition } from "./connectView";

const CreateBlockNode = (
  node: Node,
  mainConnectNode: Node,
  splitView: boolean
): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;
  const connectNodes = mainConnectNode?.connectNodes as Node[];
  const type = IsLocation(node) ? "BlockLocationNode" : "BlockFunctionNode";

  // Force node to fit Block
  let position = SetBlockNodePosition(node, splitView);
  if (connectNodes?.some((x) => x.id === node.id)) {
    position = SetConnectNodePosition(node, mainConnectNode.id, connectNodes);
  }

  // Handle size in ConnectView
  if (IsFunction(node)) {
    if (IsMainConnectNode(node.id)) {
      node.width = Size.ConnectView_Width;
      node.length = Size.ConnectView_Length;
    } else {
      node.width = Size.Node_Width;
      node.length = Size.Node_Length;
    }
  }

  if (IsLocation(node)) {
    if (node.width === 0) node.width = Size.Node_Width;
    if (node.length === 0) node.length = Size.Node_Length;
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
