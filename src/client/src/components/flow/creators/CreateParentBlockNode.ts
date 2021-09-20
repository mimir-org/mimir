import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../assets/text";
import { Position } from "../../../compLibrary";
import { Node } from "../../../models";
import { IsLocation } from "../helpers/common";

const CreateParentBlockNode = (node: Node) => {
  if (!node) return null;

  const type = IsLocation(node)
    ? TextResources.Type_BlockLocationParentNode
    : TextResources.Type_BlockFunctionParentNode;

  const position = { x: Position.FunctionBlock_xPos, y: 100 };

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: false,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default CreateParentBlockNode;
