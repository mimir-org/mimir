import { IsAspectNode } from "../../../../helpers";
import { Node } from "../../../../models";

const SetTreeNodePosition = (node: Node, parentNode: Node) => {
  if (IsAspectNode(node)) return { x: node.positionX, y: 100 };

  return { x: calculateX(node), y: calculateY(node) };
};

function calculateX(node: Node) {
  return node.positionX;
}

function calculateY(node: Node) {
  const distanceY = 200;
  return node.level * distanceY;
}

export default SetTreeNodePosition;
