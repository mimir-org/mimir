import { IsAspectNode } from "../../../../helpers";
import { Node } from "../../../../models";

const SetTreeNodePosition = (node: Node, parentNode: Node) => {
  const defaultAspectPosY = 100;
  if (IsAspectNode(node)) return { x: node.positionX, y: defaultAspectPosY };

  return { x: calculateX(node, parentNode), y: calculateY(node) };
};

function calculateX(node: Node, parentNode: Node) {
  let test = node?.positionX - parentNode.positionX / 2;

  // if (test < parentNode.positionX || test > parentNode.positionX) test = parentNode.positionX;

  // node.positionX = node?.positionX - test + parentNode?.positionX;
  return test;
}

function calculateY(node: Node) {
  const distanceY = 200;
  return node?.level * distanceY;
}

export default SetTreeNodePosition;
