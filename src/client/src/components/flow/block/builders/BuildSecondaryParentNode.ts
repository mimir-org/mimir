import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetParentBlockMarginRight } from "./helpers/SetParentNodeWidth";

/**
 * Component to create a secondary parent node in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildSecondaryParentNode = (primaryNode: Node, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) => {
  if (!primaryNode || !secondaryNode) return null;

  const type = TextResources.Type_BlockParentNode;
  const screenWidth = window.innerWidth / 2.4;
  const distanceToPrimaryNode = 150;
  const marginX = SetParentBlockMarginRight(true, libOpen, explorerOpen);

  const position = {
    x: primaryNode.positionBlockX + screenWidth - marginX + distanceToPrimaryNode,
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
