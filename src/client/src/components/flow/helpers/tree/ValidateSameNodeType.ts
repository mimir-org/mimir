import { IsFunctionNode, IsLocationNode, IsProductNode } from "../common";
import { Node, NODE_TYPE } from "../../../../models/project";

export const ValidateSameNodeType = (fromNode: Node, toNode: Node): boolean => {
  if (!fromNode || !toNode) return false;

  switch (fromNode.type) {
    case NODE_TYPE.FUNCTION:
    case NODE_TYPE.ASPECT_FUNCTION:
      return IsFunctionNode(toNode);
    case NODE_TYPE.PRODUCT:
    case NODE_TYPE.ASPECT_PRODUCT:
      return IsProductNode(toNode);
    case NODE_TYPE.LOCATION:
    case NODE_TYPE.ASPECT_LOCATION:
      return IsLocationNode(toNode);
    default:
      return false;
  }
};

export default ValidateSameNodeType;
