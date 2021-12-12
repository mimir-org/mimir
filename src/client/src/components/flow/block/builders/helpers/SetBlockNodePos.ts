import { Position } from "../../../../../models/project";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @returns an updated position, containing X and Y values.
 */

const SetBlockNodePos = (nodePos: Position, libOpen: boolean) => {
  const margin = 20;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = 300;
  const xMax = libOpen ? window.innerWidth - 400 : window.innerWidth - 80;

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 1.5;

  return { x: nodeX, y: nodeY };
};

export default SetBlockNodePos;
