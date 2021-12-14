import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Function to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param libOpen
 * @param explorerOpen
 * @param secondaryNode
 * @returns an updated position, containing X and Y values.
 */

const SetNodePos = (nodePos: Position, libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean) => {
  const margin = 20;
  const marginLarge = 80;
  const width = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = SetXMin(explorerOpen, marginLarge);
  const xMax = SetXMax(libOpen, explorerOpen, secondaryNode, width, yMin, marginLarge);

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 1.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(
  libOpen: boolean,
  explorerOpen: boolean,
  secondaryNode: boolean,
  width: number,
  yMin: number,
  marginLarge: number
) {
  if (secondaryNode) {
    if (libOpen && !explorerOpen) return width - marginLarge;
    if (!libOpen && explorerOpen) return width + 220;
    return width;
  }

  if ((libOpen && explorerOpen) || (libOpen && !explorerOpen)) return width - Size.ModuleOpen;
  return width - yMin;
}

function SetXMin(explorerOpen: boolean, marginLarge: number) {
  if (explorerOpen) return Size.ModuleOpen + marginLarge;
  return marginLarge;
}

export default SetNodePos;
