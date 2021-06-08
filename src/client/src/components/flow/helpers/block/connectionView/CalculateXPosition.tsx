import { UpdateConnectNodeSize } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateXPosition = (
  node: Node,
  xPos: number,
  connectNodes: Node[]
): number => {
  const xMargin = 7;

  if (connectNodes.length === 1)
    return (xPos += Size.ConnectView_Width / 2 - Size.Node_Width / 2);

  if (connectNodes.length === 3) UpdateConnectNodeSize(connectNodes.length);

  connectNodes.forEach((elem, i) => {
    if (i % 2 === 0 && node.id === elem.id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + xMargin);
    }
    if (i % 2 !== 0 && node.id === elem.id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2 -
        xMargin);
    }
  });

  return xPos;
};

export default CalculateXPosition;
