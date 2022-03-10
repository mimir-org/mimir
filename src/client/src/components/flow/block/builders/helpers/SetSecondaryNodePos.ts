import { BlockNodeSize, Position } from "../../../../../models/project";

/**
 * Function to force a secondary child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentNodeSize
 * @returns an updated position, containing X and Y values.
 */
const SetSecondaryNodePos = (nodePos: Position, parentNodeSize: BlockNodeSize) => {
  const width = parentNodeSize.width;
  const height = parentNodeSize.height;
  const margin = 30;
  const marginLarge = 100;

  const xMin = width + marginLarge * 2;
  const xMax = width * 2.1;
  const yMin = margin;
  const yMax = height - marginLarge * 2;

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - marginLarge;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 2;

  return { x: nodeX, y: nodeY };
};

export default SetSecondaryNodePos;
