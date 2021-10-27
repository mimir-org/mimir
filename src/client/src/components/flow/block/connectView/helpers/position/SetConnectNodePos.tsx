import { Node } from "../../../../../../models";

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

  if (node === mainNode) {
    xPos = node.positionBlockX;
    yPos = node.positionBlockY;
  }

  return { x: xPos, y: yPos };
};

function setXPos(node: Node, xPos: number, connectNodes: Node[]) {
  const leftMargin = 40;
  const rightMargin = 310;
  const center = 175;

  if (connectNodes.length === 1) return xPos + center;

  connectNodes.forEach((n, i) => {
    if (i % 2 === 0 && node.id === n.id) xPos += leftMargin;
    if (i % 2 !== 0 && node.id === n.id) xPos += rightMargin;
  });

  return xPos;
}

function setYPos(node: Node, yPos: number, connectNodes: Node[]) {
  const marginTop = 70;
  let intervalY = 150;
  yPos += marginTop;

  // TODO: Make scalable
  connectNodes?.forEach((elem, i) => {
    if (i > 1 && node.id === elem.id) {
      if (i >= 2 && i < 4) yPos += intervalY;
      if (i >= 4 && i < 6) yPos += intervalY * 2;
      if (i >= 6 && i < 8) yPos += intervalY * 3;
      if (i >= 8 && i < 10) yPos += intervalY * 4;
      if (i >= 10 && i < 12) yPos += intervalY * 6;
    }
  });

  return yPos;
}

export default SetConnectNodePos;
