import { NodeType, NODE_TYPE } from "../../../../models/project";

const GetAspectHeader = (node: NodeType): string => {
  if (node === NODE_TYPE.ASPECT_FUNCTION) return "function_header";
  if (node === NODE_TYPE.ASPECT_PRODUCT) return "product_header";
  if (node === NODE_TYPE.ASPECT_LOCATION) return "location_header";
  return null;
};

export default GetAspectHeader;
