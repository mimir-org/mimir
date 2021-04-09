import { NODE_TYPE } from "../../../../models/project";

const GetAspectHeader = (name: string) => {
  if (name === NODE_TYPE.FUNCTION) return "function_header";
  if (name === NODE_TYPE.PRODUCT) return "product_header";
  if (name === NODE_TYPE.LOCATION) return "location_header";
  return null;
};

export default GetAspectHeader;
