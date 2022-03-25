import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";
import { Position } from "../../../../../models/project";

/**
 * Component to force a child node to fit within the parent block in BlockView.
 * @param parentNode
 * @param childNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetChildNodePos = (childNodePos: Position, parentNode: Node) => {
  const margin = 30;
  const marginY = Size.BLOCK_MARGIN_Y + margin;

  const xMin = 0;
  const xMax = parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height;

  let nodeX = childNodePos.x;
  let nodeY = childNodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax - marginY;

  return { x: nodeX, y: nodeY };
};

export default SetChildNodePos;
