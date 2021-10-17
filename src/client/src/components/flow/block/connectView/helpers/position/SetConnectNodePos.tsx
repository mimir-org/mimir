import { Node } from "../../../../../../models";
import { Size } from "../../../../../../compLibrary";

/**
 * Function to force child nodes in the ConnectViewBlock to fit in the parent block.
 * @param node
 * @param mainConnectNodeId - the parent block
 * @param connectNodes - the selected child nodes in ConnectView
 * @param allNodes - all nodes in Mimir
 * @returns an X and Y position in form of numbers
 */
const SetConnectNodePos = (node: Node, mainConnectNodeId: string, connectNodes: Node[], allNodes: Node[]) => {
  const mainNode = allNodes.find((x) => x.id === mainConnectNodeId);
  let xPos = mainNode ? mainNode.positionBlockX : node.positionBlockX;
  let yPos = mainNode ? mainNode.positionBlockY : node.positionBlockY;

  xPos = setXPos(node, xPos, connectNodes);
  yPos = setYPos(node, yPos, connectNodes);

  if (node !== mainNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

function setXPos(node: Node, xPos: number, connectNodes: Node[]) {
  const leftMargin = 55;
  const rightMargin = 260;
  const center = 155;

  if (connectNodes.length === 1) return xPos + center;

  connectNodes.forEach((n, i) => {
    if (i % 2 === 0 && node.id === n.id) xPos += leftMargin;
    if (i % 2 !== 0 && node.id === n.id) xPos += rightMargin;
  });

  return xPos;
}

function setYPos(node: Node, yPos: number, connectNodes: Node[]) {
  const yMargin = 30;
  const marginTop = Size.Node_Length - 15;
  let increaseYPos = 1;
  yPos += marginTop;
  let test = 4;
  let increment = 1;
  // TODO: make algo and remove funky variables
  connectNodes?.forEach((elem, i) => {
    if (i > 1 && node.id === elem.id) {
      if (i > 3 && i < 6) increaseYPos += test * increment;
      if (i >= 6 && i < 8) increaseYPos += test * (increment * 2);
      if (i >= 8 && i < 10) increaseYPos += test * (increment * 3);
      return (yPos += Size.Node_Length + yMargin * increaseYPos);
    }
  });

  return yPos;
}

export default SetConnectNodePos;
