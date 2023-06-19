import { Aspect, AspectObject } from "lib";
import { Color } from "./Color";

export const GetRelationColor = (node: AspectObject): string => {
  if (node.aspect === Aspect.Function) return Color.SUNGLOW;
  if (node.aspect === Aspect.Location) return Color.MAGENTA;
  if (node.aspect === Aspect.Product) return Color.ELECTRIC_BLUE;
};
