import { Aspect, CreateLibraryType, LibItem, Node } from "../../../models";

const IsLocation = (node: Node | LibItem | CreateLibraryType) => {
  return node?.aspect === Aspect.Location;
};

export default IsLocation;
