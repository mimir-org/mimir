import { Node, NODE_TYPE } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateBlockNode = (node: Node): FlowElement => {
  let locationNode = null;
  if (!node) return locationNode;
  let position = { x: 850, y: node.positionY };

  const type =
    node.type === NODE_TYPE.LOCATION
      ? "BlockViewLocation"
      : "BlockViewFunction";

  locationNode = {
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

  return locationNode;
};

export default CreateBlockNode;
