import { Aspect, AspectObject } from "lib";
import * as Icons from "./aspects";

export const GetAspectIcon = (node: AspectObject) => {
  if (node.aspect === Aspect.Function) return Icons.Function;
  if (node.aspect === Aspect.Product) return Icons.Product;
  if (node.aspect === Aspect.Location) return Icons.Location;
  return null;
};
