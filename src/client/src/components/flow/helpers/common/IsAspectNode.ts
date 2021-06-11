import { NodeType, Node, NODE_TYPE } from "../../../../models/project";

const IsAspectNode = (node: Node) =>
  node.type === (NODE_TYPE.ASPECT_FUNCTION as NodeType) ||
  node.type === (NODE_TYPE.ASPECT_PRODUCT as NodeType) ||
  node.type === (NODE_TYPE.ASPECT_LOCATION as NodeType);

export default IsAspectNode;
