import { Node, LibItem, Aspect, CreateLibraryType } from "../models";

const IsFunction = (item: Node | LibItem | CreateLibraryType) => {
  return item?.aspect === Aspect.Function;
};

export default IsFunction;
