import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsFunction = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Function;
};

export default IsFunction;
