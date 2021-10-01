import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const CalculateXPosition = (node: Node, xPos: number, connectNodes: Node[]) => {
  const xMargin = 5;

  if (connectNodes.length === 1)
    return xPos + Size.ConnectView_Width / 2 - Size.Node_Width / 2;

  connectNodes?.forEach((elem, i) => {
    if (i % 2 === 0 && node.id === elem.id) {
      xPos += Size.ConnectView_Width / 4 - Size.Node_Width / 2 - xMargin;
    }
    if (i % 2 !== 0 && node.id === elem.id) {
      xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2;
    }
  });

  return xPos;
};

export default CalculateXPosition;
