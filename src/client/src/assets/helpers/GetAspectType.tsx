import { Aspect, Node } from "../../models";
import { NodeType, NODE_TYPE } from "../../models/project";

const GetAspectType = (node: Node): NodeType => {
  if (node.aspect === Aspect.Function) return NODE_TYPE.FUNCTION as NodeType;
  if (node.aspect === Aspect.Product) return NODE_TYPE.PRODUCT as NodeType;
  if (node.aspect === Aspect.Location) return NODE_TYPE.LOCATION as NodeType;
  return null;
};

export default GetAspectType;
