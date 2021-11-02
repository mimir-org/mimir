import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetConnectorOrder } from "./helpers";

/**
 * Component to create a secondary node in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildParentSecondaryNode = (primaryNode: Node, secondaryNode: Node) => {
  if (!primaryNode || !secondaryNode) return null;
  SetConnectorOrder(secondaryNode);

  const type = TextResources.Type_BlockParentNode;
  const margin = 100;
  const position = { x: primaryNode.positionBlockX + primaryNode.blockWidth + margin, y: primaryNode.positionBlockY };

  secondaryNode.positionBlockX = position.x;
  secondaryNode.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: secondaryNode.id,
    type: type,
    data: secondaryNode,
    position: position,
    isHidden: false,
    isSelected: secondaryNode.isSelected,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default BuildParentSecondaryNode;
