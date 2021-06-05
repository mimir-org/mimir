import { NODE_TYPE, Node, LibNode } from "../../../../models/project";

const IsProductNode = (node: Node | LibNode) => {
  return (
    node?.type === NODE_TYPE.PRODUCT || node?.type === NODE_TYPE.ASPECT_PRODUCT
  );
};

export default IsProductNode;
