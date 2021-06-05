import { FunctionIcon, ProductIcon, LocationIcon } from "../../assets/icons";
import { Node, NODE_TYPE } from "../../models/project";

const GetAspectIcon = (node: Node): string => {
  if (node.type === NODE_TYPE.ASPECT_FUNCTION) return FunctionIcon;
  if (node.type === NODE_TYPE.ASPECT_PRODUCT) return ProductIcon;
  if (node.type === NODE_TYPE.ASPECT_LOCATION) return LocationIcon;
  return null;
};

export default GetAspectIcon;
