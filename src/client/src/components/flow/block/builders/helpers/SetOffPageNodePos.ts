import { Size } from "../../../../../compLibrary/size/Size";
import { Node, Project } from "../../../../../models";
import { Position } from "../../../../../models/project";

/**
 * Component to force an OffPageNode to fit the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @param project
 * @returns a Position object.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node, project: Project) => {
  if (!offPageNode || !parentNode) return null;

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(secondaryNode, offPageNode, project);
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
 * @param project
 * @returns a Position object.
 */
function HandleSplitViewOffPage(secondaryNode: Node, offPageNode: Node, project: Project) {
  const offPageParentId = offPageNode?.parentNodeId;
  const parentBlock = project.nodes.find((n) => n.parentNodeId === offPageParentId);

  if (parentBlock?.id !== secondaryNode?.id) return null;

  if (offPageNode.isOffPageTarget) return HandleTargetOffPagePos(parentBlock, offPageNode);
  return HandleSourceOffPagePos(parentBlock, offPageNode);
}

export default SetOffPageNodePos;
