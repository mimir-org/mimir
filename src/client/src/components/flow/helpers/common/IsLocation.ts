import { Aspect, LibraryNodeItem, Node } from "../../../../models";

const IsLocation = (node: Node | LibraryNodeItem) => {
  return (
    node?.aspect === Aspect.Location || node?.aspect.toString() === "Location"
  );
};

export default IsLocation;
