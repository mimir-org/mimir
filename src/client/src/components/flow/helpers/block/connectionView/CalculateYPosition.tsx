import { Node } from "../../../../../models/project";

const CalculateConnectionYPosition = (
  node: Node,
  yPos: number,
  nodeWidth: number,
  connectionNodes: Node[]
): number => {
  const xMargin = 10;
  const yMargin = 20;

  //   if (connectionNodes.length === 3) {
  //     if (node.id === connectionNodes[2].id) {
  //       yPos += Size.Node_Height + yMargin;
  //     }
  //   }

  return yPos;
};

export default CalculateConnectionYPosition;
