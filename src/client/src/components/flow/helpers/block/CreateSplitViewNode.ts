import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { SetSplitViewNodePosition } from ".";

const CreateSplitViewNode = (node: Node): FlowElement => {
  let splitViewBlock = null;
  if (!node) return splitViewBlock;

  const type =
    node.type === NODE_TYPE.LOCATION
      ? "BlockViewLocation"
      : "BlockViewFunction";

  // Force node to fit Block
  const position = SetSplitViewNodePosition(node);

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
