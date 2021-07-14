import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../assets/text";
import { Position } from "../../../compLibrary";
import { Node } from "../../../models";

const CreateParentBlockNode = (node: Node) => {
  if (!node) return null;

  const type = TextResources.Type_FunctionBlock;
  const position = { x: Position.FunctionBlock_xPos, y: 0 };

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: false,
    draggable: false,
    selectable: false,
  } as FlowElement;
};

export default CreateParentBlockNode;
