import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeType } from "../common";

const CreateTreeNode = (node: Node): FlowElement => {
  let treeNode = null;
  if (!node) return treeNode;

  const position = { x: node.positionX, y: node.positionY };

  treeNode = {
    id: node.id,
    type: GetNodeType(node),
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  };

  return treeNode;
};

export default CreateTreeNode;
