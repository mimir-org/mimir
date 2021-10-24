import { Size } from "../../../../../compLibrary";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @returns an updated position, containing X and Y values.
 */
const SetBlockNodePos = (nodePos: { x: number; y: number }, parentPos: { x: number; y: number }) => {
  const parentX = parentPos.x;
  const parentY = parentPos.y;
  let nodeY = nodePos.y;
  let nodeX = nodePos.x;
  const xMargin = 20;

  const xMin = parentX;
  const xMax = parentX + Size.BlockView_Width;
  const yMin = parentY;
  const yMax = parentY + Size.BlockView_Height;

  if (nodeX < xMin) nodeX = xMin + xMargin;
  if (nodeX > xMax) nodeX = xMax - (xMargin + Size.Node_Width);
  if (nodeY < yMin) nodeY = yMin + 50;
  if (nodeY > yMax) nodeY = yMax - 130;

  return { x: nodeX, y: nodeY };
};

export default SetBlockNodePos;
