import { Node } from "../../../../../models";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param node
 * @returns an updated position, containing X and Y values.
 */
const SetBlockNodePos = (node: Node, parent: Node) => {
  const parentX = parent.positionBlockX;
  const parentY = parent.positionBlockY;
  const nodeX = node.positionBlockX;
  const nodeY = node.positionBlockY;

  const diffY = nodeY - parentY;
  let dy = nodeY - diffY + 200;

  const diffX = nodeX - parentX;
  let dx = nodeX - diffX + nodeX / 4;

  return { x: dx, y: dy };
};

export default SetBlockNodePos;
