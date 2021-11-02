import { BlockNodeSize } from "../../../../../models/project";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @param parentNodeSize
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (
  nodePos: { x: number; y: number },
  parentPos: { x: number; y: number },
  parentNodeSize: BlockNodeSize
) => {
  const parentX = parentPos.x;
  const parentY = parentPos.y;

  const yMax = parentY + parentNodeSize?.length - 50;
  const yMin = parentY + 50;
  const xPos = parentX + parentNodeSize?.width + 3;

  if (nodePos.y < yMin) nodePos.y = yMin;
  if (nodePos.y > yMax) nodePos.y = yMax;
  if (nodePos.x < xPos) nodePos.x = xPos;
  if (nodePos.x > xPos) nodePos.x = xPos;

  return { x: nodePos.x, y: nodePos.y };
};

export default SetOffPageNodePos;
