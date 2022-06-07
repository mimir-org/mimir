import { XYPosition } from "react-flow-renderer";
import { Size } from "../../../../../assets/size/Size";
import { Node } from "../../../../../models";

/**
 * Component to validate that a Node's position is not outside the boundary of its ParentNode in BlockView.
 * @param parentNode
 * @param id
 * @param position
 * @returns a boolean value.
 */
export const ValidateNodePosition = (parentNode: Node, id: string, position: XYPosition) => {
  if (!parentNode || !position || id === parentNode.id) return false;

  const x = position.x;
  const y = position.y;

  const margin = 30;
  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.positionBlockX + parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  const validX = x > xMin && x < xMax;
  const validY = y > yMin && y < yMax;

  return validX && validY;
};
