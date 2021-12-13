import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetMarginX } from "../nodes/helpers/SetParentNodeSize";
import { SetConnectorOrder } from "./helpers";

/**
 * Component to create a secondary parent node in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildSecondaryParentNode = (primaryNode: Node, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean) => {
  if (!primaryNode || !secondaryNode) return null;
  SetConnectorOrder(secondaryNode);

  const type = TextResources.Type_BlockParentNode;
  const screenWidth = window.innerWidth / 2.3;
  const marginX = SetMarginX(true, libOpen, explorerOpen);
  const position = { x: primaryNode.positionBlockX + screenWidth - marginX + 70, y: primaryNode.positionBlockY };

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
