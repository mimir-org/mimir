import { Aspect, LibItem, Node } from "../../../models";

const IsLocation = (node: Node | LibItem) => {
  return node?.aspect === Aspect.Location;
};

export default IsLocation;
