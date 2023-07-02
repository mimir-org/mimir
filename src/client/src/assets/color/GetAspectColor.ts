import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { Color } from "./Color";
import { AspectColorType } from "../../models";
import { Aspect, AspectObject } from "lib";

type NodeItem = AspectObject | AspectObjectLibCm;

/**
 * Component to get the color for a given item.
 * @param node
 * @param colorType
 * @param isTransparent
 * @returns the color according to the chosen criteriums.
 */
export const GetAspectColor = (node: NodeItem, colorType: AspectColorType, isTransparent?: boolean) => {
  if (isTransparent) return GetTransparentColor(node);
  if (colorType === AspectColorType.Main) return GetMainColor(node);
  if (colorType === AspectColorType.Selected) return GetSelectedColor(node);
  if (colorType === AspectColorType.Header) return GetHeaderColor(node);
  if (colorType === AspectColorType.Tab) return GetTabColor(node);
};

function GetTransparentColor(node: NodeItem) {
  if (node.aspect === Aspect.Function) return "rgba(251, 201, 19, 0.1)";
  if (node.aspect === Aspect.Product) return "rgba(6, 144, 152, 0.1)";
  if (node.aspect === Aspect.Location) return "rgba(163, 0, 167, 0.1)";
}

function GetMainColor(node: NodeItem) {
  if (node.aspect === Aspect.Function) return Color.LEMON_YELLOW;
  if (node.aspect === Aspect.Product) return Color.ELECTRIC_BLUE;
  if (node.aspect === Aspect.Location) return Color.MAGENTA;
}

function GetSelectedColor(node: NodeItem) {
  if (node.aspect === Aspect.Function) return Color.SUNGLOW;
  if (node.aspect === Aspect.Product) return Color.VIRIDIAN_GREEN;
  if (node.aspect === Aspect.Location) return Color.PURPLE_MUNSELL;
}

function GetHeaderColor(node: NodeItem) {
  if (node.aspect === Aspect.Function) return Color.LEMON_YELLOW_CRAYOLA;
  if (node.aspect === Aspect.Product) return Color.CELESTE;
  if (node.aspect === Aspect.Location) return Color.PINK_LACE;
}

function GetTabColor(node: NodeItem) {
  if (node.aspect === Aspect.Function) return Color.JASMINE;
  if (node.aspect === Aspect.Product) return Color.DARK_TURQUOISE;
  if (node.aspect === Aspect.Location) return Color.PINK;
}
