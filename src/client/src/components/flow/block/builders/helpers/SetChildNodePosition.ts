import { Size } from "../../../../../compLibrary/size";
import { Position } from "../../../../../models/project";
import { BlockNodeSize } from "../../redux/types";

/**
 * Component to force a child node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentNodeSize
 * @param isSecondaryNode
 * @returns an updated position, containing X and Y values.
 */
const SetChildNodePosition = (nodePos: Position, parentNodeSize: BlockNodeSize, isSecondaryNode?: boolean) => {
  const width = parentNodeSize.width;
  const height = parentNodeSize.height;
  const splitViewMargin = Size.BLOCK_SPLITVIEW_DISTANCE;
  const margin = 30;
  const marginLarge = 130;
  const marginY = Size.BLOCK_MARGIN_Y + margin;

  const xMin = !isSecondaryNode ? 0 : width + splitViewMargin;
  const xMax = !isSecondaryNode ? width - marginLarge : width * 2;
  const yMin = margin;
  const yMax = height;

  let nodeX = nodePos.x;
  let nodeY = nodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin * 2;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - marginY;

  return { x: nodeX, y: nodeY };
};

export default SetChildNodePosition;
