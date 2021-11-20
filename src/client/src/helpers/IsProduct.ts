import { Node, LibItem, Aspect, CreateLibraryType } from "../models";

const IsProduct = (node: Node | LibItem | CreateLibraryType) => {
  return node?.aspect === Aspect.Product;
};

export default IsProduct;
