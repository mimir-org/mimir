import { Size } from "../../../../../compLibrary/size/Size";
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

  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  let nodeX = childNodePos.x;
  let nodeY = childNodePos.y;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax;
  if (nodeY < yMin) nodeY = yMin + margin;
  if (nodeY > yMax) nodeY = yMax;

  return { x: nodeX, y: nodeY };
};

export default SetChildNodePos;
