import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsLocation = (node: Node | LibraryNodeItem) => {
  return (
    node?.aspect === Aspect.Location || node?.aspect.toString() === "Location"
  );
};

export default IsLocation;
