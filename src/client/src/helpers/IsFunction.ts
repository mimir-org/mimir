import { Node, LibItem, Aspect, CreateLibraryType } from "../models";

const IsFunction = (node: Node | LibItem | CreateLibraryType) => {
  return node?.aspect === Aspect.Function;
};

export default IsFunction;
