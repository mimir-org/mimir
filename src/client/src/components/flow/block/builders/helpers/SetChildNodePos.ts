import { Size } from "../../../../../assets/size/Size";
import { Position } from "../../../../../models/project";
import { AspectObject } from "lib";

/**
 * Component to force a child node to fit within the parent block in BlockView.
 * @param parentNode
 * @param childNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetChildNodePos = (childNodePos: Position, parentNode: AspectObject) => {
  const margin = 30;

  const xMin = parentNode.blockPosX;
  // const xMax = parentNode.width - Size.NODE_WIDTH;
  const xMax = 500 - Size.NODE_WIDTH;
  const yMin = margin;
  // const yMax = parentNode.height - Size.NODE_HEIGHT;
  const yMax = 500 - Size.NODE_HEIGHT;

  let x = childNodePos.x;
  let y = childNodePos.y;

  if (x < xMin) x = xMin + margin;
  if (x > xMax) x = xMax;
  if (y < yMin) y = yMin + margin;
  if (y > yMax) y = yMax;

  return { x, y };
};

export default SetChildNodePos;
