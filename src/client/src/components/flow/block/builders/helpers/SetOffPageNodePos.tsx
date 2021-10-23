import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param node
 * @param parent
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (node: Node, parent: Node) => {
  const yMax = parent.positionBlockY + Size.BlockView_Height - 50;
  const yMin = parent.positionBlockY + 50;
  const xPos = parent.positionBlockX + 650;

  if (node.positionBlockY < yMin) node.positionBlockY = yMin;
  if (node.positionBlockY > yMax) node.positionBlockY = yMax;
  if (node.positionBlockX < xPos) node.positionBlockX = xPos;
  if (node.positionBlockX > xPos) node.positionBlockX = xPos;

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetOffPageNodePos;
