import { NODE_TYPE } from "../../../../models/project";

const GetCheckboxColor = (aspect: string) => {
  if (aspect === NODE_TYPE.FUNCTION) return "function_underline";
  if (aspect === NODE_TYPE.PRODUCT) return "product_underline";
  if (aspect === NODE_TYPE.LOCATION) return "location_underline";
  return null;
};
export default GetCheckboxColor;
