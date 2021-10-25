import { Size } from "../../../../../compLibrary";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (nodePos: { x: number; y: number }, parentPos: { x: number; y: number }) => {
  const yMax = parentPos.y + Size.BlockView_Height - 50;
  const yMin = parentPos.y + 50;
  const xPos = parentPos.x + 650;

  if (nodePos.y < yMin) nodePos.y = yMin;
  if (nodePos.y > yMax) nodePos.y = yMax;
  if (nodePos.x < xPos) nodePos.x = xPos;
  if (nodePos.x > xPos) nodePos.x = xPos;

  return { x: nodePos.x, y: nodePos.y };
};

export default SetOffPageNodePos;
