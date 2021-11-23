import { BlockNodeSize, Position } from "../../../../../models/project";

/**
 * Function to force an offpage node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @param parentNodeSize
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (nodePos: Position, parentPos: Position, parentNodeSize: BlockNodeSize) => {
  const yMax = parentPos.y + parentNodeSize?.height - 50;
  const yMin = parentPos.y + 50;
  const xPos = parentPos.x + parentNodeSize?.width + 3;

  if (nodePos.y < yMin) nodePos.y = yMin;
  if (nodePos.y > yMax) nodePos.y = yMax;
  if (nodePos.x < xPos) nodePos.x = xPos;
  if (nodePos.x > xPos) nodePos.x = xPos;

  return { x: nodePos.x, y: nodePos.y };
};

export default SetOffPageNodePos;
