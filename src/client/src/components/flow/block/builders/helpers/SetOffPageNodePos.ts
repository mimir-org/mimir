import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";
import { GetParent } from "../../../helpers";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(parentNode, secondaryNode, offPageNode);
    if (splitOffPagePos !== null) return splitOffPagePos;
  }

  // If the OffPageNode is a targetNode find the position to the right of the parentNode
  if (offPageNode.isOffPageTarget) return HandleTargetOffPage(parentNode, offPageNode);

  // If the OffPageNode is a sourceNode find the position to the left of the parentNode
  return HandleSourceOffPage(parentNode, offPageNode);
};

/**
 * Function to force an OffPageNode to be placed on the left of the parent block.
 * @param parentNode
 * @param offPageNode
 * @returns a Position object.
 */
function HandleSourceOffPage(parentNode: Node, offPageNode: Node) {
  const marginX = 35;
  const marginY = 30;

  const yMax = parentNode.height;
  const yMin = Size.BLOCK_MARGIN_Y;

  const nodeX = parentNode.positionBlockX - marginX;
  let nodeY = offPageNode.positionBlockY;

  if (nodeY > yMax) nodeY = yMax - marginY;
  if (nodeY < yMin) nodeY = yMin + marginY;

  return { x: nodeX, y: nodeY } as Position;
}

/**
 * Function to force an OffPageNode to be placed on the right of the parent block.
 * @param parentNode
 * @param offPageNode
 * @returns a Position object.
 */
function HandleTargetOffPage(parentNode: Node, offPageNode: Node) {
  const marginX = parentNode.width !== Size.BLOCK_NODE_WIDTH ? 30 : 0;
  const marginY = 30;

  const yMax = parentNode.height;
  const yMin = Size.BLOCK_MARGIN_Y;

  const nodeX = parentNode.positionBlockX + parentNode.width - marginX;
  let nodeY = offPageNode.positionBlockY;

  if (nodeY < yMin) nodeY = yMin - marginY;
  if (nodeY > yMax) nodeY = yMax - marginY;

  return { x: nodeX, y: nodeY } as Position;
}

/**
 * Function to force the position of an OffPageNode that is a child of the SecondaryNode.
 * @param parentNode
 * @param secondaryNode
 * @param offPageNode
 * @returns a Position object.
 */
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

  return { x, y } as Position;
}

export default SetOffPageNodePos;
