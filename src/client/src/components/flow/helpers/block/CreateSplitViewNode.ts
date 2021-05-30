import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetSplitViewNodePosition } from ".";
import { IsLocationNode } from "..";
import { Size } from "../../../../componentLibrary";

const CreateSplitViewNode = (node: Node): FlowElement => {
  let splitViewBlock = null;
  if (!node) return splitViewBlock;

  const type = IsLocationNode(node) ? "BlockViewLocation" : "BlockViewFunction";

  // Force node to fit Block
  const position = SetSplitViewNodePosition(node);

  if (!node.width) node.width = Size.Node_Width;
  if (!node.height) node.height = Size.Node_Height;

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
