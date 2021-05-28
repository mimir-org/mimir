import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsLocationNode } from "..";
import { Size } from "../../../../componentLibrary";

const CreateBlockNode = (node: Node, splitView: boolean): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;

  const type = IsLocationNode(node) ? "BlockViewLocation" : "BlockViewFunction";

  // Force node to fit Block
  const position = SetBlockNodePosition(node, splitView);

  if (!node.width) node.width = Size.Node_Width;
  if (!node.height) node.height = Size.Node_Height;

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
