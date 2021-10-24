import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const DetectCollision = (position: { x: number; y: number }, primaryNode: Node) => {
  const xMargin = 100;
  const yMargin = 50;
  const width = Size.BlockView_Width;
  const height = Size.BlockView_Height;
  const primaryX = primaryNode.positionBlockX;
  const primaryY = primaryNode.positionBlockY;

  const yMin = primaryY;
  const yMax = yMin + height;
  const secondYMin = position.y;
  const secondYMax = secondYMin + height;

  const hitXLeft = position.x + width >= primaryX && position.x + width <= primaryX + width;
  const hitXRight = position.x >= primaryX && position.x <= primaryX + width;
  const hitYTop = secondYMax >= yMin && secondYMax <= yMax;
  const hitYBottom = position.y <= yMax + 50 && position.y >= yMin;

  if (hitXRight && (hitYTop || hitYBottom)) position.x = primaryX + width + xMargin;
  if (hitXLeft && (hitYTop || hitYBottom)) position.x = primaryX - width - xMargin;
  if (hitYTop && (hitXLeft || hitXRight)) position.y = primaryY - height - yMargin;
  if (hitYBottom && (hitXLeft || hitXRight)) position.y = primaryY + height + yMargin;
};

export default DetectCollision;
