import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateYPosition = (
  node: Node,
  yPos: number,
  connectNodes: Node[]
): number => {
  const yMargin = 20;

  //TODO: make dynamic
  if (connectNodes.length === 1 || connectNodes.length === 2) {
    return yPos;
  }

  if (connectNodes.length === 3) {
    if (node.id === connectNodes[0].id) {
      return yPos;
    }

    if (node.id === connectNodes[1].id) {
      return yPos - 40;
    }

    if (node.id === connectNodes[2].id) {
      return (yPos += Size.Node_Length / 2 + yMargin / 2);
    }
  }

  if (connectNodes.length === 4) {
    if (node.id === connectNodes[0].id) {
      return yPos;
    }

    if (node.id === connectNodes[1].id) {
      return yPos;
    }

    if (node.id === connectNodes[2].id) {
      return (yPos += Size.Node_Length + yMargin);
    }

    if (node.id === connectNodes[3].id) {
      return (yPos += Size.Node_Length + yMargin);
    }
  }

  return yPos;
};

export default CalculateYPosition;
