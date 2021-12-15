import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a secondary child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param libOpen
 * @param explorerOpen
 * @returns an updated position, containing X and Y values.
 */

const SetSecondaryNodePos = (nodePos: Position, libOpen: boolean, explorerOpen: boolean) => {
  const margin = 20;
  const width = window.innerWidth / 2.3;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = SetXMin(width, explorerOpen, libOpen);
  const xMax = SetXMax(width, explorerOpen, libOpen);

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 1.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(width: number, explorerOpen: boolean, libOpen: boolean) {
  const marginLarge = 250;
  const marginSmall = 40;

  if (!explorerOpen && libOpen) return width * 2;
  if (explorerOpen && libOpen) return width * 2 - marginSmall;

  return width * 2 + marginLarge;
}

function SetXMin(width: number, explorerOpen: boolean, libOpen: boolean) {
  const margin = 180;

  if (!explorerOpen && libOpen) return width + margin;
  if (explorerOpen && !libOpen) return width + Size.ModuleOpen + margin;

  return width + Size.ModuleOpen;
}

export default SetSecondaryNodePos;
