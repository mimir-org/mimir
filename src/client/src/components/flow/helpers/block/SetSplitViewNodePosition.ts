import { Size } from "../../../../componentLibrary";
import { Node } from "../../../../models/project";

const SetSplitViewNodePosition = (node: Node) => {
  const yMax = Size.SplitView_Height;
  const yMin = Size.SplitView_Height - 500;
  const xMax = 1400;
  const xMin = 1000;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetSplitViewNodePosition;
