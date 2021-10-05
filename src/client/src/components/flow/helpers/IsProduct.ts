import { Node, LibItem, Aspect } from "../../../models";

const IsProduct = (node: Node | LibItem) => {
  return node?.aspect === Aspect.Product;
};

export default IsProduct;
