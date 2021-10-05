import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../assets/text";
import { Position } from "../../../compLibrary";
import { Node } from "../../../models";
import { IsFunction } from "../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @param splitView
 * @returns a FlowElement, the big box in BlockView.
 */
const CreateParentBlockNode = (node: Node, splitView: boolean) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  let position = { x: Position.FunctionBlock_xPos, y: 100 };

  if (!IsFunction(node) && splitView) position.x = Position.FunctionBlock_xPos + 750; // TODO: remove magic number

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
