import { Node } from "../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateLocationNode = (node: Node): FlowElement => {
  let locationNode = null;
  if (!node) return locationNode;
  let position = { x: 850, y: node.positionY };

  const type = "BlockViewLocation";

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

export default CreateLocationNode;
