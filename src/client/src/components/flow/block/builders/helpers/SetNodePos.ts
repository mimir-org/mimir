import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param splitView
 * @param isProduct
 * @returns an updated position, containing X and Y values.
 */

const SetNodePos = (nodePos: Position, splitView: boolean, isProduct: boolean) => {
  const width = splitView ? window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR : window.innerWidth - Size.BLOCK_MARGIN_X;
  const margin = 30;
  const marginLarge = 80;

  const yMin = margin;
  const yMax = window.innerHeight - 180;
  const xMin = marginLarge;
  const xMax = isProduct ? Size.BLOCK_PRODUCT_WIDTH : width - margin;

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + 20;
  if (nodeY > yMax) nodeY = yMax - margin * 3.5;

  return { x: nodeX, y: nodeY };
};

export default SetNodePos;
