import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateBlockNode = (node: Node): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;
  let type: string;

  if (node.type === NODE_TYPE.FUNCTION) {
    type = "BlockViewFunction";
  }
  if (node.type === NODE_TYPE.LOCATION) {
    type = "BlockViewLocation";
  }

  // Force nodes to fit Block
  if (node.positionBlockY > 400) node.positionBlockY /= 1.7;
  const position = { x: node.positionBlockX, y: node.positionBlockY };

  blockNode = {
    id: node.id,
    type: type ?? node.type,
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
