import { Node } from "../models";

const IsAspectNode = (node: Node) => {
  return node?.isRoot;
};

export default IsAspectNode;
