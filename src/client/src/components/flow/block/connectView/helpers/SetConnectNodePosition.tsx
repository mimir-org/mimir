import { Node } from "../../../../../models";
import { Size } from "../../../../../compLibrary";
import { CalculateXPosition, CalculateYPosition } from ".";

/**
 * Function to force child nodes in the ConnectViewBlock to fit in the parent block.
 * @param node
 * @param mainConnectNodeId
 * @param connectNodes - the selected child nodes in ConnectView
 * @param allNodes - all nodes in Mimir
 * @returns an X and Y position in form of numbers
 */
const SetConnectNodePosition = (node: Node, mainConnectNodeId: string, connectNodes: Node[], allNodes: Node[]) => {
  const mainNode = allNodes.find((x) => x.id === mainConnectNodeId);

  let xPos = mainNode ? mainNode.positionBlockX : node.positionBlockX;
  let yPos = mainNode ? mainNode.positionBlockY : node.positionBlockY;

  xPos = CalculateXPosition(node, xPos, connectNodes);
  yPos = CalculateYPosition(node, yPos, connectNodes);
  if (connectNodes?.length === 0) yPos -= Size.Node_Length;

  if (node !== mainNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
