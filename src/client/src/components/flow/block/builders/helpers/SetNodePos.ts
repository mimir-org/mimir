import { Size } from "../../../../../compLibrary/size";
import { BlockNodeSize, Position } from "../../../../../models/project";

/**
 * Function to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param isProduct
 * @param parentNodeSize
 * @returns an updated position, containing X and Y values.
 */

const SetNodePos = (nodePos: Position, isProduct: boolean, parentNodeSize: BlockNodeSize) => {
  const width = parentNodeSize.width;
  const height = parentNodeSize.height;
  const margin = 30;
  const marginLarge = 100;

  const xMin = marginLarge;
  const xMax = isProduct ? Size.BLOCK_PRODUCT_WIDTH : width - margin;
  const yMin = margin;
  const yMax = height + marginLarge * 2;

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin * 2;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - marginLarge;

  return { x: nodeX, y: nodeY };
};

export default SetNodePos;
