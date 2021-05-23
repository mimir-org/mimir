import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateSplitViewNode = (node: Node): FlowElement => {
  let splitViewBlock = null;
  if (!node) return splitViewBlock;

  const type =
    node.type === NODE_TYPE.LOCATION
      ? "BlockViewLocation"
      : "BlockViewFunction";

  // Force nodes to fit Block
  if (node.positionBlockY > 400) node.positionBlockY /= 2;
  const position = { x: 850, y: node.positionBlockY };

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
