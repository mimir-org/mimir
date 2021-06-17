import { Node } from "../../models";
import { NodeType, NODE_TYPE } from "../../models/project";

const GetAspectType = (node: Node): NodeType => {
  if (node.type === NODE_TYPE.ASPECT_FUNCTION)
    return NODE_TYPE.FUNCTION as NodeType;
  if (node.type === NODE_TYPE.ASPECT_PRODUCT)
    return NODE_TYPE.PRODUCT as NodeType;
  if (node.type === NODE_TYPE.ASPECT_LOCATION)
    return NODE_TYPE.LOCATION as NodeType;
  return null;
};

export default GetAspectType;
