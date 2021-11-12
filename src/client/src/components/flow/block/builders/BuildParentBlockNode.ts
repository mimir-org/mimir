import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetConnectorOrder } from "./helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @returns a FlowElement, the large box in BlockView.
 */
const BuildParentBlockNode = (node: Node) => {
  if (!node) return null;
  SetConnectorOrder(node);

  const type = TextResources.Type_BlockParentNode;
  const position = { x: 0, y: 0 };
  node.positionBlockX = position.x;
  node.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: false,
    selectable: false,
  } as FlowElement;
};

export default BuildParentBlockNode;
