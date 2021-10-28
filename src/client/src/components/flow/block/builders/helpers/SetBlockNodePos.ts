import { Size } from "../../../../../compLibrary";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @param parentNodeWidth
 * @returns an updated position, containing X and Y values.
 */
const SetBlockNodePos = (nodePos: { x: number; y: number }, parentPos: { x: number; y: number }, parentNodeWidth: number) => {
  const parentX = parentPos.x;
  const parentY = parentPos.y;
  let nodeY = nodePos.y;
  let nodeX = nodePos.x;
  const margin = 20;

  const xMin = parentX;
  const xMax = parentX + parentNodeWidth - Size.Node_Width;
  const yMin = parentY + margin;
  const yMax = parentY + Size.BlockView_Length - Size.Node_Length;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin * 2;
  if (nodeY > yMax) nodeY = yMax - margin;

  return { x: nodeX, y: nodeY };
};

export default SetBlockNodePos;
