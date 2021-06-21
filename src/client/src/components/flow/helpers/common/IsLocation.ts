import { Aspect, LibraryNodeItem, Node } from "../../../../models";

const IsLocation = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Location;
};

export default IsLocation;
