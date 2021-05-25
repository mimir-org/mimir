import { NODE_TYPE, Node } from "../../../models/project";

const IsLocationNode = (node: Node) => {
  return (
    node?.type === NODE_TYPE.LOCATION ||
    node?.type === NODE_TYPE.ASPECT_LOCATION
  );
};

export default IsLocationNode;
