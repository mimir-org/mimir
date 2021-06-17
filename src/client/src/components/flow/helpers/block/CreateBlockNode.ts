import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsFunction, IsLocation } from "../common";
import { Size } from "../../../../compLibrary";
import { SetConnectNodePosition } from "./connectView";
import red from "../../../../redux/store";

const CreateBlockNode = (
  node: Node,
  splitView: boolean,
  mainConnectNode: Node
): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;

  const connectNodes = red.store.getState().connectView.connectNodes as Node[];
  const type = IsLocation(node) ? "BlockLocationNode" : "BlockFunctionNode";

  // Force node to fit Block
  let position = SetBlockNodePosition(node, splitView);
  if (connectNodes.includes(node)) position = SetConnectNodePosition(node);

  if (IsFunction(node)) {
    if (mainConnectNode && mainConnectNode.id === node.id) {
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
