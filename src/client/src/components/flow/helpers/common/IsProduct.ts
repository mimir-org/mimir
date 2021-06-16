import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsProduct = (node: Node | LibraryNodeItem) => {
  return node?.aspect === Aspect.Product;
};

export default IsProduct;
