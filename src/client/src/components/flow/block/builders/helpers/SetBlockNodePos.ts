import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param node
 * @param splitView
 * @returns an updated position, containing X and Y values.
 */
const SetBlockNodePos = (node: Node, splitView: boolean) => {
  const yMax = Size.BlockView_Height;
  const yMin = Size.BlockView_MarginTop;

  const xMax = splitView
    ? Size.SplitView_Width + Size.BlockView_MarginRight
    : Size.BlockView_Width + Size.BlockView_MarginRight;
  const xMin = Size.BlockView_MarginLeft;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xMin) node.positionBlockX = xMin;
  if (node.positionBlockX > xMax) node.positionBlockX = xMax;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetBlockNodePos;