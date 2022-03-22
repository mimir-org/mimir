import { Size } from "../../../../../compLibrary/size";
import { BlockNodeSize, Position } from "../../../../../models/project";

/**
 * Component to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param size
 * @param splitView
 * @returns an updated position, containing X and Y values.
 */
const SetChildNodePosition = (nodePos: Position, size: BlockNodeSize, splitView?: boolean) => {
  const splitViewMargin = Size.SPLITVIEW_DISTANCE;
  const margin = 30;

  const marginY = Size.BLOCK_MARGIN_Y + margin;

  const xMin = !splitView ? 0 : size.width + splitViewMargin;
  const xMax = !splitView ? size.width - Size.NODE_WIDTH : size.width * 2;
  const yMin = margin;
  const yMax = size.height;

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - marginY;

  return { x: nodeX, y: nodeY };
};

export default SetChildNodePosition;
