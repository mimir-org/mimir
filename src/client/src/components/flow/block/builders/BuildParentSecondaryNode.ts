import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
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
  const position = { x: secondaryNode.positionBlockX, y: secondaryNode.positionBlockY };

  DetectCollision(position, primaryNode);
  secondaryNode.isHidden = false;

  return {
    key: CreateId(),
    id: secondaryNode.id,
    type: type,
    data: secondaryNode,
    position: position,
    isHidden: false,
    isSelected: true,
    draggable: true,
    selectable: true,
  } as FlowElement;
};

export default BuildParentSecondaryNode;
