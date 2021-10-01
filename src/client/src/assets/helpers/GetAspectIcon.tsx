import { Aspect, Node } from "../../models";
import { FunctionIcon, ProductIcon, LocationIcon } from "../../assets/icons/common";

const GetAspectIcon = (node: Node): string => {
  if (node.aspect === Aspect.Function) return FunctionIcon;
  if (node.aspect === Aspect.Product) return ProductIcon;
  if (node.aspect === Aspect.Location) return LocationIcon;
  return null;
};

export default GetAspectIcon;
