import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../assets/text";
import { Position } from "../../../compLibrary";
import { Node } from "../../../models";
import { IsLocation } from "../helpers/common";

/**  Component to draw the parent node in BlockView. The component returns an instance of FlowElement */
const CreateParentBlockNode = (node: Node, splitView: boolean) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  let position = { x: Position.FunctionBlock_xPos, y: 100 };

  if (IsLocation(node) && splitView)
    position.x = Position.FunctionBlock_xPos + 750; // TODO: remove magic number

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: true,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default CreateParentBlockNode;
