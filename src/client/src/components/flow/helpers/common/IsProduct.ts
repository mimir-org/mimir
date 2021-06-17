import { Node, LibraryNodeItem, Aspect } from "../../../../models";

const IsProduct = (node: Node | LibraryNodeItem) => {
  return (
    node?.aspect === Aspect.Product || node?.aspect.toString() === "Product"
  );
};

export default IsProduct;
