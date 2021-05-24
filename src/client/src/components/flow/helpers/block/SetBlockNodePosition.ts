import { Size } from "../../../../componentLibrary";
import { Node } from "../../../../models/project";

const SetBlockNodePosition = (node: Node, splitView: boolean) => {
  const yMax = Size.BlockView_Height;
  const yMin = Size.BlockView_Height - 500;
  const xMax = splitView ? 400 : 900;
  const xMin = 100;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetBlockNodePosition;
