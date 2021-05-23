import { Node } from "../../../../models/project";

const SetSplitViewNodePosition = (node: Node) => {
  const yMax = 600;
  const yMin = 100;
  const xMax = 1100;
  const xMin = 700;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetSplitViewNodePosition;
