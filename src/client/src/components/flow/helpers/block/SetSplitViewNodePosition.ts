import { Size } from "../../../../compLibrary";
import { Node } from "../../../../models/project";

const SetSplitViewNodePosition = (node: Node) => {
  const yMax = Size.SplitView_Height;
  const yMin = Size.BlockView_MarginTop;

  const xMax = Size.BlockView_Width + Size.SplitView_Width;
  const xMin = Size.BlockView_Width + Size.SplitView_MarginLeft;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetSplitViewNodePosition;
