import { Node } from "../../../models";

const IsFamily = (node: Node, nodeToCheck: Node) => {
  return node.aspect === nodeToCheck.aspect;
};

export default IsFamily;
