import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetConnectorOrder } from "./helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildParentBlockNode = (node: Node) => {
  if (!node) return null;

  SetConnectorOrder(node);

  const type = TextResources.Type_BlockParentNode;
  const parentX = 400;
  const parentY = 80;
  const position = { x: parentX, y: parentY };
  node.positionBlockX = position.x;
  node.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: false,
    isSelected: node.isSelected,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default BuildParentBlockNode;
