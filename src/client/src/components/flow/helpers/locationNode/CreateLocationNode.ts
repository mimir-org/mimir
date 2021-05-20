import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateLocationNode = (node: Node): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;
  let position = { x: 50, y: node.positionY };

  elementNode = {
    id: node.id,
    type: node.type,
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

export default CreateLocationNode;
