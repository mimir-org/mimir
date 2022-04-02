import { Size } from "../../../../../compLibrary/size/Size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";
import { GetParent } from "../../../helpers";

/**
 * Component to force an OffPageNode to fit the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns a Position object.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(secondaryNode, offPageNode);
    if (splitOffPagePos !== null) return splitOffPagePos;
  }

  if (offPageNode.isOffPageTarget) return HandleTargetOffPagePos(parentNode, offPageNode);

  return HandleSourceOffPagePos(parentNode, offPageNode);
};

/**
 * Function to force an OffPageNode to be placed on the left of the parent block.
 * @param parentNode
 * @param offPageNode
 * @returns a Position object.
 */
function HandleSourceOffPagePos(parentNode: Node, offPageNode: Node) {
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
function HandleTargetOffPagePos(parentNode: Node, offPageNode: Node) {
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
 * @param secondaryNode
 * @param offPageNode
 * @returns a Position object.
 */
function HandleSplitViewOffPage(secondaryNode: Node, offPageNode: Node) {
  const offPageParent = GetParent(offPageNode?.id);
  const parentBlock = GetParent(offPageParent?.id);

  if (parentBlock?.id !== secondaryNode?.id) return null;

  if (offPageNode.isOffPageTarget) return HandleTargetOffPagePos(parentBlock, offPageNode);
  return HandleSourceOffPagePos(parentBlock, offPageNode);
}

export default SetOffPageNodePos;
