import { Node } from "../models";

const IsDirectChild = (child: Node, parent: Node) => {
  return child?.level - parent?.level === 1;
};

export default IsDirectChild;
