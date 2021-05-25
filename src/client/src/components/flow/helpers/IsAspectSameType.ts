import { NODE_TYPE, Node, LibNode } from "../../../models/project";

const IsAspectSameType = (aspectNode: Node, node: Node | LibNode) => {
  return (
    (aspectNode?.type === NODE_TYPE.ASPECT_LOCATION &&
      node?.type === NODE_TYPE.LOCATION) ||
    (aspectNode?.type === NODE_TYPE.ASPECT_FUNCTION &&
      node?.type === NODE_TYPE.FUNCTION) ||
    (aspectNode?.type === NODE_TYPE.ASPECT_PRODUCT &&
      node?.type === NODE_TYPE.PRODUCT)
  );
};

export default IsAspectSameType;
