import { NodePositionChange } from "react-flow-renderer";
import { Size } from "../../../../compLibrary/size/Size";
import { GetParentNode } from "../../../../helpers/Family";
import { Project } from "../../../../models";

/**
 * Component to validate that a Node's position is not outside the boundary of its ParentNode in BlockView.
 * @param changes
 * @param project
 * @returns a boolean value.
 */
export const ValidateNodePosition = (changes: NodePositionChange[], project: Project) => {
  const nodeId = changes[0].id;
  const position = changes[0].position;
  const parentNode = GetParentNode(nodeId, project);

  if (!position || !parentNode) return false;

  const x = position.x;
  const y = position.y;

  const margin = 30;
  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  const validX = x > xMin && x < xMax;
  const validY = y > yMin && y < yMax;

  return validX && validY;
};
