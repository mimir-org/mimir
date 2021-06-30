import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsFunction, IsLocation } from "../common";
import { Size } from "../../../../compLibrary";
import { IsMainConnectNode, SetConnectNodePosition } from "./connectView";

const CreateBlockNode = (node: Node, connectNode: Node, splitView: boolean) => {
  if (!node) return null;

  const connectNodes = connectNode?.connectNodes as Node[];
  const type = IsLocation(node) ? "BlockLocationNode" : "BlockFunctionNode";

  // Force node to fit Block
  let position = SetBlockNodePosition(node, splitView);
  if (connectNodes?.some((x) => x.id === node.id)) {
    position = SetConnectNodePosition(node, connectNode.id, connectNodes);
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

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    draggable: true,
    selectable: true,
    connectable: true,
    sourceHandle: null,
  } as FlowElement;
};

export default CreateBlockNode;
