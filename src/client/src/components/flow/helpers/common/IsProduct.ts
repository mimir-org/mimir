import { Node, LibraryNodeItem, Aspect } from "../../../../models";

const IsProduct = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Product;
};

export default IsProduct;
