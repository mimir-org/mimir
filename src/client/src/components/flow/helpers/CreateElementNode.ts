import { Node, NODE_TYPE } from "../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateElementNode = (node: Node, isBlock: boolean): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  let type;

  if (node.type === NODE_TYPE.FUNCTION && isBlock) {
    type = "BlockViewFunction";
  }

  let position = {};
  isBlock
    ? (position = { x: node.positionBlockX, y: node.positionBlockY })
    : (position = { x: node.positionX, y: node.positionY });

  elementNode = {
    id: node.id,
    type: type ? type : node.type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  };

  return elementNode;
};

export default CreateElementNode;
