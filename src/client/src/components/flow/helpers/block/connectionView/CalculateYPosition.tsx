import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateYPosition = (
  node: Node,
  yPos: number,
  connectNodes: Node[]
): number => {
  const yMargin = 20;
  const marginTop = Size.Node_Length;
  yPos += marginTop;

  // TODO: fix scaling
  connectNodes.forEach((elem, i) => {
    if (i <= 1 && node.id === elem.id) return yPos;
    if (i >= 2 && node.id === elem.id)
      return (yPos += Size.Node_Length + yMargin);
  });

  return yPos;
};

export default CalculateYPosition;
