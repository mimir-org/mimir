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
  const margin = 30;
  const marginLarge = 80;
  const width = splitView ? window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR : window.innerWidth - Size.BLOCK_MARGIN_X;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = marginLarge;
  const xMax = splitView ? width - 30 : SetXMax(width, isProduct);

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + 20;
  if (nodeY > yMax) nodeY = yMax - margin * 3.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(width: number, isProduct: boolean) {
  if (isProduct) {
    const productWidth = Size.BLOCK_PRODUCT_WIDTH;
    return productWidth - 60;
  }
  return width - 30;
}

export default SetNodePos;
