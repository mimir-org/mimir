import { Size } from "../../../../../compLibrary/size/Size";
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
  const width = window.innerWidth / 2.4;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = SetXMin(width, explorerOpen, libOpen);
  const xMax = SetXMax(width, explorerOpen, libOpen);

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin;
  if (nodeX > xMax) nodeX = xMax;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 4.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(width: number, explorerOpen: boolean, libOpen: boolean) {
  if (!explorerOpen && libOpen) return width * 1.8;
  if (explorerOpen && !libOpen) return width * 2.2;
  if (explorerOpen && libOpen) return width * 1.8;
  if (!explorerOpen && !libOpen) return width * 2.1;
}

function SetXMin(width: number, explorerOpen: boolean, libOpen: boolean) {
  if (!explorerOpen && libOpen) return width + 100;
  if (explorerOpen && !libOpen) return width + Size.MODULE_OPEN + 70;
  return width + 300;
}

export default SetSecondaryNodePos;
