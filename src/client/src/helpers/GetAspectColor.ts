import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Color } from "../assets/color/Color";
import { AspectColorType } from "../models";
import { Node } from "@mimirorg/modelbuilder-types";
import { IsFunction, IsLocation, IsProduct } from "./Aspects";

type NodeItem = Node | NodeLibCm;

/**
 * Component to get the color for a given item.
 * @param node
 * @param colorType
 * @param isTransparent
 * @returns the color according to the chosen criteriums.
 */
const GetAspectColor = (node: NodeItem, colorType: AspectColorType, isTransparent?: boolean) => {
  if (isTransparent) return GetTransparentColor(node);
  if (colorType === AspectColorType.Main) return GetMainColor(node);
  if (colorType === AspectColorType.Selected) return GetSelectedColor(node);
  if (colorType === AspectColorType.Header) return GetHeaderColor(node);
  if (colorType === AspectColorType.Tab) return GetTabColor(node);
};

function GetTransparentColor(node: NodeItem) {
  if (IsFunction(node)) return "rgba(251, 201, 19, 0.1)";
  if (IsProduct(node)) return "rgba(6, 144, 152, 0.1)";
  if (IsLocation(node)) return "rgba(163, 0, 167, 0.1)";
}

function GetMainColor(node: NodeItem) {
  if (IsFunction(node)) return Color.LEMON_YELLOW;
  if (IsProduct(node)) return Color.ELECTRIC_BLUE;
  if (IsLocation(node)) return Color.MAGENTA;
}

function GetSelectedColor(node: NodeItem) {
  if (IsFunction(node)) return Color.SUNGLOW;
  if (IsProduct(node)) return Color.VIRIDIAN_GREEN;
  if (IsLocation(node)) return Color.PURPLE_MUNSELL;
}

function GetHeaderColor(node: NodeItem) {
  if (IsFunction(node)) return Color.LEMON_YELLOW_CRAYOLA;
  if (IsProduct(node)) return Color.CELESTE;
  if (IsLocation(node)) return Color.PINK_LACE;
}

function GetTabColor(node: NodeItem) {
  if (IsFunction(node)) return Color.JASMINE;
  if (IsProduct(node)) return Color.DARK_TURQUOISE;
  if (IsLocation(node)) return Color.PINK;
}

export default GetAspectColor;
