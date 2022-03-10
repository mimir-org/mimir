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
  const marginLarge = 100;

  const xMin = marginLarge;
  const xMax = isProduct ? Size.BLOCK_PRODUCT_WIDTH : width - margin;
  const yMin = margin;
  const yMax = window.innerHeight - marginLarge * 2;

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin * 2;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - marginLarge;

  return { x: nodeX, y: nodeY };
};

export default SetNodePos;
