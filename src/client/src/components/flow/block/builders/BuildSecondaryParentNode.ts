import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Size } from "../../../../compLibrary/size/Size";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a secondary parent node in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @returns the second ParentNode in SpliView.
 */
const BuildSecondaryParentNode = (primaryNode: Node, secondaryNode: Node) => {
  if (!primaryNode || !secondaryNode) return null;

  const type = TextResources.BLOCK_PARENTNODE;
  const width = Size.BLOCK_NODE_WIDTH;
  const distanceToPrimaryNode = Size.SPLITVIEW_DISTANCE;

  // The secondaryNode is positioned to the right of the primaryNode
  const position = {
    x: primaryNode.positionBlockX + distanceToPrimaryNode + width,
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
    selectable: false,
  } as FlowElement;
};

export default BuildSecondaryParentNode;
