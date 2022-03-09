import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a secondary child node to fit within the parent block in BlockView.
 * @param nodePos
 * @returns an updated position, containing X and Y values.
 */
const SetSecondaryNodePos = (nodePos: Position) => {
  const width = window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR;
  const margin = 30;
  const marginLarge = 100;

  const xMin = width + marginLarge * 2;
  const xMax = width * 2.1;
  const yMin = margin;
  const yMax = window.innerHeight - marginLarge * 2;

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - marginLarge;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 2;

  return { x: nodeX, y: nodeY };
};

export default SetSecondaryNodePos;
