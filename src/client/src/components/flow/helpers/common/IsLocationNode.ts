import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsLocationNode = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Location;
};

export default IsLocationNode;
