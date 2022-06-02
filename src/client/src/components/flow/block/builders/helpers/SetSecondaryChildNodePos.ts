import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";

/**
 * Component to force a child node to fit within the secondary parent block in BlockView.
 * @param primaryNode
 * @param secondaryNode
 * @param childNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetSecondaryChildNodePos = (primaryNode: Node, secondaryNode: Node, childNodePos: Position) => {
  const splitViewMargin = Size.SPLITVIEW_DISTANCE;
  const margin = 30;
  const marginY = Size.BLOCK_MARGIN_Y + margin;

  const xMin = primaryNode.positionBlockX + primaryNode.width + splitViewMargin;
  const xMax = secondaryNode.positionBlockX + secondaryNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = secondaryNode.height;

  let x = childNodePos.x;
  let y = childNodePos.y;

  if (x < xMin) x = xMin + margin;
  if (x > xMax) x = xMax;
  if (y < yMin) y = yMin + margin;
  if (y > yMax) y = yMax - marginY;

  return { x, y };
};

export default SetSecondaryChildNodePos;
