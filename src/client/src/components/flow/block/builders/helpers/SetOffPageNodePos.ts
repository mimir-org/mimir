import { Position } from "../../../../../models/project";

/**
 * Method to force an offpage node to fit on the border of the ParentBlockNode.
 * Note: an offpage node's parent is not the ParentBlockNode, but the ParentBlockNode sets the boundaries for
 * the OffPageNode's position
 * @param offPageNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNodePos: Position) => {
  // const marginY = 50;

  // const yMin = marginY * 3;
  // const xMax = parentNodeSize?.width;

  // let offPageY = offPageNodePos.y;
  // let offPageX = offPageNodePos.x;

  // if (offPageNodePos.x < xMax) offPageX = xMax;
  // if (offPageNodePos.x > xMax) offPageX = xMax;
  // if (offPageNodePos.y < yMin) offPageY = yMin;
  // if (offPageNodePos.y > yMax) offPageY = yMax;

  return { x: offPageNodePos.x, y: offPageNodePos.y };
};

export default SetOffPageNodePos;
