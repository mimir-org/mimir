import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";

/**
 * Method to force an offpage node to fit on the border of the ParentBlockNode.
 * Note: an offpage node's parent is not the ParentBlockNode, but the ParentBlockNode sets the boundaries for
 * the OffPageNode's position
 * @param offPageNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNodePos: Position, libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean) => {
  const width = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;

  const xMin = SetXMin(libOpen, explorerOpen, secondaryNode, width);
  const xMax = xMin;

  const yMin = 120;

  let offPageX = offPageNodePos.x;
  let offPageY = offPageNodePos.y;

  if (offPageNodePos.x < xMin) offPageX = xMin;
  if (offPageNodePos.x > xMax) offPageX = xMin;
  // if (offPageNodePos.y < yMin) offPageY = yMin;
  // if (offPageNodePos.y > yMax) offPageY = yMax;

  return { x: offPageX, y: offPageY };
};

function SetXMin(libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean, width: number) {
  const marginLarge = 145;

  if (secondaryNode) {
    if (libOpen && !explorerOpen) return width + 85;
    if (!libOpen && explorerOpen) return width + Size.ModuleOpen + 55;
    if ((!libOpen && !explorerOpen) || (libOpen && explorerOpen)) return width + Size.ModuleOpen - 115;
  }

  if (explorerOpen && !libOpen) return width + Size.ModuleOpen - 175;
  if ((explorerOpen && libOpen) || (!explorerOpen && libOpen)) return width - marginLarge;
  if (!explorerOpen && !libOpen) return width + marginLarge;
}

export default SetOffPageNodePos;
