import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Size } from "../../../../compLibrary";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { DetectCollision, SetConnectorOrder } from "./helpers";

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
  const nodePos = { x: secondaryNode.positionBlockX, y: secondaryNode.positionBlockY };
  // const position = DetectCollision(nodePos, primaryNode);
  const position = { x: primaryNode.positionBlockX + Size.BlockView_Width + 150, y: primaryNode.positionBlockY };

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
    draggable: true,
    selectable: true,
  } as FlowElement;
};

export default BuildParentSecondaryNode;
