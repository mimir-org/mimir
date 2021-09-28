import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

/**
 * Function to calculate the Y position for a child node in ConnectView
 * @param node
 * @param yPos - the current Y position
 * @param connectNodes - the list of child nodes in ConnectView
 * @returns a number, the new Y position
 */
const CalculateYPosition = (node: Node, yPos: number, connectNodes: Node[]) => {
  const yMargin = 30;
  const marginTop = Size.Node_Length - 15;
  let increaseYPos = 1;
  yPos += marginTop;
  let test = 4;
  let reidar = 1;

  connectNodes?.forEach((elem, i) => {
    if (i > 1 && node.id === elem.id) {
      if (i > 3 && i < 6) increaseYPos += test * reidar;
      if (i >= 6 && i < 8) increaseYPos += test * (reidar * 2);
      if (i >= 8 && i < 10) increaseYPos += test * (reidar * 3);
      return (yPos += Size.Node_Length + yMargin * increaseYPos);
    }
  });

  return yPos;
};

export default CalculateYPosition;
