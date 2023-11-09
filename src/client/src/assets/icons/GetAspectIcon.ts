import { Aspect, Block } from "lib";
import { FunctionIcon, LocationIcon, ProductIcon } from "@mimirorg/component-library";

export const GetAspectIcon = (node: Block) => {
  if (node.aspect === Aspect.Function) return FunctionIcon;
  if (node.aspect === Aspect.Product) return LocationIcon;
  if (node.aspect === Aspect.Location) return ProductIcon;
  return null;
};
