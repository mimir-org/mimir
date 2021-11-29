import { Node, LibItem, Aspect, CreateLibraryType } from "../models";

const IsProduct = (item: Node | LibItem | CreateLibraryType) => {
  return item?.aspect === Aspect.Product;
};

export default IsProduct;
