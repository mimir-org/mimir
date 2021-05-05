import { Node } from "../../../models/project";
import { FlowElement } from "react-flow-renderer";

const CreateElementBlockNode = (
  node: Node,
  width: number,
  height: number
): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  const type = "Functionblock";

  const elem = document.getElementById("function-block-" + node.id);
  const calculatedWidth = (width * 70) / 100;
  const calculatedHeight = (height * 80) / 100;
  const calculatedX = (width - calculatedWidth) / 2;

  if (elem) {
    elem.style.width = calculatedWidth + "px";
    elem.style.height = calculatedHeight + "px";
    elem.style.zIndex = "-10000";
  }

  const position = { x: calculatedX, y: 0 };

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
