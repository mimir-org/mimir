import { Node } from "../../../models";

const IsSiblingNodes = (node: Node, nodeTwo: Node) => {
  return node.aspect === nodeTwo.aspect && node.level === nodeTwo.level;
};

export default IsSiblingNodes;
