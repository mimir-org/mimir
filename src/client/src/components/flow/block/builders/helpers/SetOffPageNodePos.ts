import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";
import { GetParent } from "../../../helpers";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  let x = 0;
  let y = 0;

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(parentNode, secondaryNode, offPageNode);
    if (splitOffPagePos !== null) return splitOffPagePos;
  }

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

function HandleSplitViewOffPage(parentNode: Node, secondaryNode: Node, offPageNode: Node) {
  let x = 0;
  let y = 0;

  const offPageParent = GetParent(offPageNode);
  const parentBlock = GetParent(offPageParent);

  if (parentBlock?.id !== secondaryNode?.id) return null;

  const leftBound = parentNode.positionBlockX + parentNode.width + Size.SPLITVIEW_DISTANCE;

  // OffPage is source
  if (offPageNode.positionBlockX <= leftBound) {
    const margin = 35;
    x = leftBound - margin;
    y = offPageNode.positionBlockY;
    return { x, y };
  }

  // OffPage is target
  x = secondaryNode.positionBlockX + secondaryNode.width;
  y = offPageNode.positionBlockY;

  return { x, y };
}

export default SetOffPageNodePos;
