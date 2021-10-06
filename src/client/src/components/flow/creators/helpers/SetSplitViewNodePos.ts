import { Size } from "../../../../compLibrary";
import { Node } from "../../../../models";

/**
 * Function to force a node to fit within the parent block in SplitView.
 * @param node
 * @returns an updated position, containing X and Y values.
 */
const SetSplitViewNodePos = (node: Node) => {
  const yMax = Size.SplitView_Height;
  const yMin = Size.BlockView_MarginTop;

  const xMax = Size.BlockView_Width + Size.SplitView_Width;
  const xMin = Size.BlockView_Width + Size.BlockView_MarginRight;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetSplitViewNodePos;
