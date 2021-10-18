import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Position } from "../../../../compLibrary";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @param splitView
 * @param isSplitViewNode
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildParentBlockNode = (node: Node, splitView: boolean, isSplitViewNode: boolean) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  let position = { x: Position.FunctionBlock_xPos, y: 100 };

  if (splitView && isSplitViewNode) position.x = Position.FunctionBlock_xPos + 750; // TODO: remove magic number

  return {
    key: CreateId(),
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

export default BuildParentBlockNode;
