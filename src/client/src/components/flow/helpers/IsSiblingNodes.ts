import { IsFamily } from ".";
import { Node } from "../../../models";

const IsSiblingNodes = (node: Node, nodeToCheck: Node) => {
  return IsFamily(node, nodeToCheck) && node.level === nodeToCheck.level;
};

export default IsSiblingNodes;
