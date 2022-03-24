import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @param splitView
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePosition = (offPageNode: Node, parentNode: Node, splitView?: boolean) => {
  if (!offPageNode || !parentNode) return null;

  if (splitView) {
    const leftBound = parentNode.positionBlockX + parentNode.width + Size.SPLITVIEW_DISTANCE;
    if (offPageNode.positionBlockX <= leftBound) return { x: offPageNode.positionBlockX, y: offPageNode.positionBlockY };
    return { x: parentNode.positionBlockX + parentNode.width + Size.SPLITVIEW_DISTANCE, y: offPageNode.positionBlockY };
  }

  // If OffPageNode is sourceNode
  if (offPageNode.positionBlockX <= 0) return { x: offPageNode.positionBlockX, y: offPageNode.positionBlockY };

  let marginX = 0;
  if (parentNode.width !== Size.BLOCK_NODE_WIDTH) marginX = 30;

  const x = parentNode.positionBlockX + parentNode.width - marginX;
  const y = offPageNode.positionBlockY;

  return { x, y };
};

export default SetOffPageNodePosition;
