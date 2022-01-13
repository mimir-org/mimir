import { IsAspectNode } from "../../../../helpers";
import { Node } from "../../../../models";

const SetTreeNodePosition = (node: Node, _parentNode: Node) => {
  const defaultAspectPosY = 100;
  if (IsAspectNode(node)) return { x: node.positionX, y: defaultAspectPosY };

  return { x: calculateX(node), y: calculateY(node) };
};

function calculateX(node: Node) {
  return node?.positionX;
}

function calculateY(node: Node) {
  const distanceY = 250;
  return node?.level * distanceY;
}

export default SetTreeNodePosition;
