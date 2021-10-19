import { Node } from "../../../models";

const IsFamily = (node: Node, nodeTwo: Node) => {
  return node.aspect === nodeTwo.aspect;
};

export default IsFamily;
