import { FunctionIcon, ProductIcon, LocationIcon } from "../../../../assets";

const GetAspectIcon = (name: string) => {
  if (name === "Function") return FunctionIcon;
  if (name === "Product") return ProductIcon;
  if (name === "Location") return LocationIcon;
  return null;
};

export default GetAspectIcon;
