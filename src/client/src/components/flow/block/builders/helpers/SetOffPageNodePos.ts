import { Size } from "../../../../../assets/size/Size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";

/**
 * Component to force an OffPageNode to fit the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @param nodes
 * @returns a Position object.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node, nodes: Node[]) => {
  if (!offPageNode || !parentNode || !nodes) return null;

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(secondaryNode, offPageNode, nodes);
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

  const x = parentNode.positionBlockX - marginX;
  let y = offPageNode.positionBlockY;

  if (y > yMax) y = yMax - marginY;
  if (y < yMin) y = yMin + marginY;

  return { x, y } as Position;
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

  const x = parentNode.positionBlockX + parentNode.width - marginX;
  let y = offPageNode.positionBlockY;

  if (y < yMin) y = yMin - marginY;
  if (y > yMax) y = yMax - marginY;

  return { x, y } as Position;
}

/**
 * Function to force the position of an OffPageNode that is a child of the SecondaryNode.
 * @param secondaryNode
 * @param offPageNode
 * @param nodes
 * @returns a Position object.
 */
function HandleSplitViewOffPage(secondaryNode: Node, offPageNode: Node, nodes: Node[]) {
  const parentNode = nodes.find((n) => n.id === offPageNode.parentNodeId);
  const grandParentNode = nodes.find((n) => n.id === parentNode.parentNodeId);

  if (grandParentNode?.id !== secondaryNode.id) return null;

  if (offPageNode.isOffPageTarget) return HandleTargetOffPagePos(grandParentNode, offPageNode);
  return HandleSourceOffPagePos(grandParentNode, offPageNode);
}

export default SetOffPageNodePos;
