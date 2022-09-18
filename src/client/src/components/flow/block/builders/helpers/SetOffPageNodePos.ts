import { Size } from "../../../../../assets/size/Size";
import { Node } from "@mimirorg/modelbuilder-types";
import { Position } from "../../../../../models/project";
import { GetParentNode } from "../../../../../helpers/Family";

/**
 * Component to force an OffPageNode to fit the position of the ParentNode.
 * Note: this must not be confused with the function SetInitialOffPageNodePosition in the useConnectStop component.
 * @param offPageNode
 * @param parentNode
 * @param nodes
 * @param isElectroView
 * @returns a Position object.
 */
const SetOffPageNodePos = (offPageNode: Node, parentNode: Node, secondaryNode: Node, nodes: Node[], isElectroView: boolean) => {
  if (!offPageNode || !parentNode || !nodes) return null;

  const sourceNode = GetParentNode(offPageNode.id);

  // Handle OffPageNodes from the SecondaryNode
  if (secondaryNode !== undefined) {
    const splitOffPagePos = HandleSplitViewOffPage(secondaryNode, offPageNode, nodes);
    if (splitOffPagePos != null) return splitOffPagePos;
  }

  if (offPageNode.isOffPageTarget)
    return isElectroView
      ? HandleElectroTargetOffPagePos(parentNode, sourceNode)
      : HandleTargetOffPagePos(parentNode, offPageNode);

  return isElectroView ? HandleElectroSourceOffPagePos(parentNode, sourceNode) : HandleSourceOffPagePos(parentNode, offPageNode);
};

/**
 * Function to force a source OffPageNode to have the correct position.
 * If ElectroView is enabled the OffPageNode will be placed on the top of the parent block,
 * otherwise it will be placed at the left of the parent block.
 * @param parentNode
 * @param sourceNode
 * @returns a Position object.
 */
function HandleSourceOffPagePos(parentNode: Node, sourceNode: Node) {
  const marginX = 35;
  const marginY = 30;

  const yMax = parentNode.height;
  const yMin = Size.BLOCK_MARGIN_Y;

  const x = parentNode.positionBlockX - marginX;
  let y = sourceNode.positionBlockY;

  if (y > yMax) y = yMax - marginY;
  if (y < yMin) y = yMin + marginY;

  return { x, y } as Position;
}

/**
 * Function to force a source OffPageNode to have the correct position in ElectroView.
 * The OffPageNode will be placed on the top of the parent block.
 * @param parentNode
 * @param sourceNode
 * @returns a Position object.
 */
function HandleElectroSourceOffPagePos(parentNode: Node, sourceNode: Node) {
  const marginY = 30;

  const yMax = parentNode.positionBlockX + marginY;
  const yMin = parentNode.positionBlockX;

  const x = sourceNode.positionBlockX + Size.NODE_WIDTH / 2;
  let y = parentNode.positionBlockY - marginY;

  if (y > yMax) y = yMax - marginY;
  if (y < yMin) y = yMin + marginY;

  return { x, y } as Position;
}

/**
 * Function to force a target OffPageNode to have the correct position.
 * If ElectroView is enabled the OffPageNode will be placed on the bottom of the parent block,
 * otherwise it will be placed at the right of the parent block.
 * @param parentNode
 * @param sourceNode
 * @returns a Position object.
 */
function HandleTargetOffPagePos(parentNode: Node, sourceNode: Node) {
  const marginX = parentNode.width !== Size.BLOCK_NODE_WIDTH ? 30 : 0;
  const marginY = 30;

  const yMax = parentNode.height;
  const yMin = Size.BLOCK_MARGIN_Y;

  const x = parentNode.positionBlockX + parentNode.width - marginX;
  let y = sourceNode.positionBlockY;

  if (y < yMin) y = yMin - marginY;
  if (y > yMax) y = yMax - marginY;

  return { x, y } as Position;
}

/**
 * Function to force a target OffPageNode to have the correct position in ElectroView.
 * The OffPageNode will be placed on the bottom of the parent block,
 * @param parentNode
 * @param sourceNode
 * @returns a Position object.
 */
function HandleElectroTargetOffPagePos(parentNode: Node, sourceNode: Node) {
  const marginY = 80;

  const yMax = parentNode.height + marginY;
  const yMin = Size.BLOCK_MARGIN_Y;

  const x = sourceNode.positionBlockX + Size.NODE_WIDTH / 2;
  let y = parentNode.positionBlockY + parentNode.height + marginY;

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
