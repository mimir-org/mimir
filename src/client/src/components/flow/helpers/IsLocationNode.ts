import { NODE_TYPE, Node, LibNode } from "../../../models/project";

const IsLocationNode = (node: Node | LibNode): boolean => {
  return (
    node?.type === NODE_TYPE.LOCATION ||
    node?.type === NODE_TYPE.ASPECT_LOCATION
  );
};

export default IsLocationNode;
