import { FunctionIcon, ProductIcon, LocationIcon } from "../../../../assets";
import { NODE_TYPE } from "../../../../models/project";

const GetAspectIcon = (name: string) => {
  if (name === NODE_TYPE.FUNCTION) return FunctionIcon;
  if (name === NODE_TYPE.PRODUCT) return ProductIcon;
  if (name === NODE_TYPE.LOCATION) return LocationIcon;
  return null;
};

export default GetAspectIcon;
