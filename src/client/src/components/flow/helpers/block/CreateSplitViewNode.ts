import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetSplitViewNodePosition } from ".";
import { IsLocation } from "../common";
import { Size } from "../../../../compLibrary";

const CreateSplitViewNode = (node: Node): FlowElement => {
  let splitViewBlock = null;
  if (!node) return splitViewBlock;

  const type = IsLocation(node) ? "BlockLocationNode" : "BlockFunctionNode";

  // Force node to fit Block
  const position = SetSplitViewNodePosition(node);

  if (IsLocation(node)) {
    if (!node.width) node.width = Size.Node_Width;
    if (!node.length) node.length = Size.Node_Length;
    node.height = 0; // Z-axis
  }

  splitViewBlock = {
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

  return splitViewBlock;
};

export default CreateSplitViewNode;
