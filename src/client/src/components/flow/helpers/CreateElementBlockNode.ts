import { Node } from "../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateElementBlockNode = (node: Node, width: number): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  const type = "FunctionBlock";
  const calculatedWidth = (width * 70) / 100;
  const calculatedX = (width - calculatedWidth) / 2;
  //   const position = { x: calculatedX, y: 0 };
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

export default CreateElementBlockNode;
