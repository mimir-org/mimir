import { FlowElement } from "react-flow-renderer";
import { Position } from "../../../../compLibrary";
import { Node } from "../../../../models";

const CreateParentBlockNode = (node: Node): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;
  console.log("FunctionBlock");

  const type = "FunctionBlock";
  const position = { x: Position.FunctionBlock_xPos, y: 0 };

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
