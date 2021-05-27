import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition } from ".";
import { IsLocationNode } from "..";

const CreateBlockNode = (node: Node, splitView: boolean): FlowElement => {
  let blockNode = null;
  if (!node) return blockNode;

  let id = null;

  const type = IsLocationNode(node) ? "BlockViewLocation" : "BlockViewFunction";
  id = IsLocationNode(node) && "BlockViewLocation-" + node.id;

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
