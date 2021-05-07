import { Node } from "../../../models/project";
import { IsAspectNode } from "../helpers";
import { FlowElement } from "react-flow-renderer";

const CreateElementNode = (node: Node, isBlock: boolean): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  let type = !IsAspectNode(node.type)
    ? node.type.charAt(0).toUpperCase() + node.type.substring(1).toLowerCase()
    : node.type;

  let position = {};
  isBlock
    ? (position = { x: node.positionBlockX, y: node.positionBlockY })
    : (position = { x: node.positionX, y: node.positionY });

  elementNode = {
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

  return elementNode;
};

export default CreateElementNode;
