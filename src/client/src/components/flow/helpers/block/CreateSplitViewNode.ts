import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateSplitViewNode = (node: Node): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;
  let position = { x: 850, y: node.positionY };

  const type =
    node.type === NODE_TYPE.LOCATION
      ? "BlockViewLocation"
      : "BlockViewFunction";

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

export default CreateSplitViewNode;
