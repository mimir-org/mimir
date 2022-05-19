import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";

/**
 * Component to force a child node to fit within the parent block in BlockView.
 * @param parentNode
 * @param childNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetChildNodePos = (childNodePos: Position, parentNode: Node) => {
  const margin = 30;

  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  let x = childNodePos.x;
  let y = childNodePos.y;

  if (x < xMin) x = xMin + margin;
  if (x > xMax) x = xMax;
  if (y < yMin) y = yMin + margin;
  if (y > yMax) y = yMax;

  return { x, y };
};

export default SetChildNodePos;
