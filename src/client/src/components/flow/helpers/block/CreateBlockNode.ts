import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";

const CreateBlockNode = (node: Node, splitView: boolean): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;

  const type =
    node.type === NODE_TYPE.LOCATION || node.type === NODE_TYPE.ASPECT_LOCATION
      ? "BlockViewLocation"
      : "BlockViewFunction";

  // Force node to fit Block
  const position = SetBlockNodePosition(node, splitView);

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
