import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateYPosition = (
  node: Node,
  yPos: number,
  connectNodes: Node[]
): number => {
  const yMargin = 25;
  const marginTop = Size.Node_Length - 10;
  yPos += marginTop;

  // TODO: fix scaling
  connectNodes.forEach((elem, i) => {
    if (i <= 1 && node.id === elem.id) {
      return yPos;
    }
    if (i >= 2 && i < 4 && node.id === elem.id) {
      return (yPos += Size.Node_Length + yMargin);
    }
    if (i > 3 && i <= 5 && node.id === elem.id) {
      return (yPos += Size.Node_Length + yMargin * 4.5);
    }
    if (i > 5 && node.id === elem.id) {
      return (yPos += Size.Node_Length + yMargin * 8);
    }
  });

  return yPos;
};

export default CalculateYPosition;
