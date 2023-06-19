import { Aspect, AspectObject } from "lib";
import { FunctionIcon, LocationIcon, ProductIcon } from "@mimirorg/component-library";

export const GetAspectIcon = (node: AspectObject) => {
  if (node.aspect === Aspect.Function) return FunctionIcon;
  if (node.aspect === Aspect.Product) return LocationIcon;
  if (node.aspect === Aspect.Location) return ProductIcon;
  return null;
};
