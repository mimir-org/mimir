import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";

/**
 * Component to force an OffPageNode to fit into the position of the SecondaryNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetSecondaryOffPagePos = (offPageNode: Node, parentNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  let x: number;
  let y: number;

  // If the OffPageNode is a sourceNode find the position to the left of the secondaryNode
  const leftBound = parentNode.positionBlockX + parentNode.width + Size.SPLITVIEW_DISTANCE;

  if (offPageNode.positionBlockX <= leftBound) {
    x = offPageNode.positionBlockX;
    y = offPageNode.positionBlockY;
    return { x, y };
  }

  // If the OffPageNode is a targetNode find the position to the right of the secondaryNode
  x = parentNode.positionBlockX + parentNode.width + Size.SPLITVIEW_DISTANCE;
  y = offPageNode.positionBlockY;

  return { x, y };
};

export default SetSecondaryOffPagePos;
