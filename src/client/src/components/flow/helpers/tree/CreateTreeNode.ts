import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeType } from "../common";

const CreateTreeNode = (node: Node) => {
  if (!node) return null;
  const position = { x: node.positionX, y: node.positionY };

  return {
    id: node.id,
    type: GetNodeType(node),
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default CreateTreeNode;
