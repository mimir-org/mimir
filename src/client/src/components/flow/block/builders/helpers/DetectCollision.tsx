import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const DetectCollision = (position: { x: number; y: number }, primaryNode: Node) => {
  const xMargin = 150;

  if (position.x - primaryNode.positionBlockX <= Size.BlockView_Width + 100) {
    position.x = primaryNode.positionBlockX + Size.BlockView_Width + xMargin;
  }
};

export default DetectCollision;
