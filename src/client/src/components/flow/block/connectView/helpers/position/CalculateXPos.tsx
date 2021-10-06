import { Node } from "../../../../../../models";

/**
 * Function to calculate the X position for a child node in ConnectView.
 * @param node
 * @param xPos - the current X position.
 * @param connectNodes - the list of child nodes in ConnectView.
 * @returns a number, the new X position.
 */
const CalculateXPos = (node: Node, xPos: number, connectNodes: Node[]) => {
  const leftMargin = 35;
  const rightMargin = 235;
  const center = 135;

  if (connectNodes.length === 1) return xPos + center;

  connectNodes?.forEach((n, i) => {
    if (i % 2 === 0 && node.id === n.id) xPos += leftMargin;
    if (i % 2 !== 0 && node.id === n.id) xPos += rightMargin;
  });

  return xPos;
};

export default CalculateXPos;
