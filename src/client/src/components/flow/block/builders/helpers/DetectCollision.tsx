import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const DetectCollision = (position: { x: number; y: number }, primaryNode: Node) => {
  const xMargin = 100;
  const width = Size.BlockView_Width;
  const height = Size.BlockView_Height;
  const primaryX = primaryNode.positionBlockX;
  const primaryY = primaryNode.positionBlockY;

  const primaryYMin = primaryY;
  const primaryYMax = primaryYMin + height;
  const secondaryYMin = position.y;
  const secondaryYMax = secondaryYMin + height;

  const hitXLeft = position.x + width >= primaryX && position.x + width <= primaryX + width;
  const hitXRight = position.x >= primaryX && position.x <= primaryX + width;
  const hitYTop = secondaryYMax >= primaryYMin && secondaryYMax <= primaryYMax;
  const hitYBottom = position.y <= primaryYMax + 50 && position.y >= primaryYMin;

  if (hitXRight && (hitYTop || hitYBottom)) position.x = primaryX + width + xMargin;
  if (hitXLeft && (hitYTop || hitYBottom)) position.x = primaryX - width - xMargin;

  return { x: position.x, y: position.y };
};

export default DetectCollision;
