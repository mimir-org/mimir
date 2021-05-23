import { FlowElement } from "react-flow-renderer";
import { Node } from "../../../../models/project";

const CreateParentBlockNode = (node: Node, width: number): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  // Big block node that contains child nodes
  const type = "FunctionBlock";
  const position = { x: 220, y: 0 };

  elementNode = {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: false,
    draggable: false,
    selectable: false,
  };

  return elementNode;
};

export default CreateParentBlockNode;
