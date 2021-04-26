import { FunctionIcon, ProductIcon, LocationIcon } from "../../../../assets";
import { NodeType, NODE_TYPE } from "../../../../models/project";

const GetAspectIcon = (node: NodeType): string => {
  if (node === NODE_TYPE.ASPECT_FUNCTION) return FunctionIcon;
  if (node === NODE_TYPE.ASPECT_PRODUCT) return ProductIcon;
  if (node === NODE_TYPE.ASPECT_LOCATION) return LocationIcon;
  return null;
};

export default GetAspectIcon;
