import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a secondary child node to fit within the parent block in BlockView.
 * @param nodePos
 * @returns an updated position, containing X and Y values.
 */
const SetSecondaryNodePos = (nodePos: Position) => {
  const margin = 20;
  const width = window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = width + 300;
  const xMax = width * 2.1;

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin;
  if (nodeX > xMax) nodeX = xMax;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 4.5;

  return { x: nodeX, y: nodeY };
};

export default SetSecondaryNodePos;
