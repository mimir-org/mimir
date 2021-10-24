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
  const position = { x: node.positionBlockX, y: node.positionBlockY };

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: false,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
  } as FlowElement;
};

export default BuildParentBlockNode;
