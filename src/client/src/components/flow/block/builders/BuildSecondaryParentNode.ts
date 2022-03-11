import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Size } from "../../../../compLibrary/size/Size";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a secondary parent node in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildSecondaryParentNode = (primaryNode: Node, secondaryNode: Node) => {
  if (!primaryNode || !secondaryNode) return null;

  const type = TextResources.BLOCK_PARENTNODE;
  const screenWidth = window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR;
  const distanceToPrimaryNode = Size.BLOCK_SPLITVIEW_DISTANCE;

  // The secondaryNode is positioned to the right of the primaryNode
  const position = {
    x: primaryNode.positionBlockX + distanceToPrimaryNode + screenWidth,
    y: primaryNode.positionBlockY,
  };

  // TODO: Remove state mutation outside store
  secondaryNode.positionBlockX = position.x;
  secondaryNode.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: secondaryNode.id,
    type: type,
    data: secondaryNode,
    position: position,
    isHidden: secondaryNode.isHidden,
    isSelected: secondaryNode.isSelected,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default BuildSecondaryParentNode;
