import { NODE_TYPE, Node, LibNode } from "../../../../models/project";

const IsFunctionNode = (node: Node | LibNode): boolean => {
  return (
    node?.type === NODE_TYPE.FUNCTION ||
    node?.type === NODE_TYPE.ASPECT_FUNCTION
  );
};

export default IsFunctionNode;
