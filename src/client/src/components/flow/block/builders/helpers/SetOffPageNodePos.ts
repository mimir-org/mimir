import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  let x: number;
  let y: number;

  // If the OffPageNode is a sourceNode find the position to the left of the parentNode
  if (offPageNode.positionBlockX <= 0) {
    x = offPageNode.positionBlockX;
    y = offPageNode.positionBlockY;
    return { x, y };
  }

  // If the OffPageNode is a targetNode find the position to the right of the parentNode
  let marginX = 0;
  if (parentNode.width !== Size.BLOCK_NODE_WIDTH) marginX = 30;

  x = parentNode.positionBlockX + parentNode.width - marginX;
  y = offPageNode.positionBlockY;

  return { x, y };
};

export default SetOffPageNodePos;
