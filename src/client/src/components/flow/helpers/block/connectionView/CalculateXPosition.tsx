import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateConnectionXPosition = (
  node: Node,
  xPos: number,
  nodeWidth: number,
  connectionNodes: Node[]
): number => {
  const margin = 10;
  if (connectionNodes.length === 1) {
    xPos += nodeWidth / 2 - Size.Node_Width / 2;
  }

  if (connectionNodes.length === 2) {
    if (node.id === connectionNodes[0].id) {
      xPos += nodeWidth / 4 - Size.Node_Width / 2;
    }

    if (node.id === connectionNodes[1].id) {
      xPos += nodeWidth / 2 + nodeWidth / 4 - Size.Node_Width / 2;
    }
  }

  if (connectionNodes.length === 3) {
    if (node.id === connectionNodes[0].id) {
      xPos += nodeWidth / 4 - Size.Node_Width / 2;
    }

    if (node.id === connectionNodes[1].id) {
      xPos += nodeWidth / 2 + nodeWidth / 4 - Size.Node_Width / 2;
    }

    if (node.id === connectionNodes[2].id) {
      xPos += nodeWidth / 4 - 150;
    }
  }

  return xPos;
};

export default CalculateConnectionXPosition;
