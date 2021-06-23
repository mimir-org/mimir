import { ResizeMainConnectNode } from ".";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const CalculateXPosition = (
  node: Node,
  xPos: number,
  connectNodes: Node[],
  mainConnectNode: Node
): number => {
  const xMargin = 7;
  ResizeMainConnectNode(connectNodes?.length, mainConnectNode); // TODO: Move?

  if (connectNodes?.length === 1) {
    console.log("her");
    return (xPos += Size.ConnectView_Width / 2 - Size.Node_Width / 2);
  }

  connectNodes?.forEach((elem, i) => {
    if (i % 2 === 0 && node.id === elem.id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 - xMargin);
    }
    if (i % 2 !== 0 && node.id === elem.id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2);
    }
  });

  return xPos;
};

export default CalculateXPosition;
