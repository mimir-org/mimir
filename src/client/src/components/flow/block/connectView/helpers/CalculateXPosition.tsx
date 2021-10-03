import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

/**
 * Function to calculate the X position for a child node in ConnectView.
 * @param node
 * @param xPos - the current X position.
 * @param connectNodes - the list of child nodes in ConnectView.
 * @returns a number, the new X position.
 */
const CalculateXPosition = (node: Node, xPos: number, connectNodes: Node[]) => {
  const xMargin = 5;

  if (connectNodes.length === 1) return xPos + Size.ConnectView_Width / 2 - Size.Node_Width / 2;

  connectNodes?.forEach((elem, i) => {
    if (i % 2 === 0 && node.id === elem.id) {
      xPos += Size.ConnectView_Width / 4 - Size.Node_Width / 2 - xMargin;
    }
    if (i % 2 !== 0 && node.id === elem.id) {
      xPos += Size.ConnectView_Width / 2 + Size.ConnectView_Width / 4 - Size.Node_Width / 2;
    }
  });

  return xPos;
};

export default CalculateXPosition;
