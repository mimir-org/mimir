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
  const width = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;

  const yMin = 30;
  const yMax = window.innerHeight - 180;
  const xMin = SetXMin(explorerOpen);
  const xMax = SetXMax(libOpen, explorerOpen, secondaryNode, width);

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - margin * 1.5;

  return { x: nodeX, y: nodeY };
};

function SetXMax(libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean, width: number) {
  if (secondaryNode) {
    if (libOpen && !explorerOpen) return width - 80;
    if (!libOpen && explorerOpen) return width + 220;
    return width;
  }

  if ((libOpen && explorerOpen) || (libOpen && !explorerOpen)) return width - Size.ModuleOpen;
  return width - 30;
}

function SetXMin(explorerOpen: boolean) {
  const margin = 80;

  if (explorerOpen) return Size.ModuleOpen + margin;
  return margin;
}

export default SetNodePos;
