import { NodeType, NODE_TYPE } from "../../../models/project";

const IsAspectNode = (nodeType: NodeType): boolean =>
  nodeType === (NODE_TYPE.ASPECT_FUNCTION as NodeType) ||
  nodeType === (NODE_TYPE.ASPECT_PRODUCT as NodeType) ||
  nodeType === (NODE_TYPE.ASPECT_LOCATION as NodeType);

export default IsAspectNode;
