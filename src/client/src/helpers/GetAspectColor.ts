import { Color } from "../compLibrary/colors";
import { AspectColorType, LibItem, Node } from "../models";
import { IsFunction, IsLocation, IsProduct } from ".";

/**
 * Component to get the color for a given item.
 * @param node
 * @param colorType
 * @param isTransparent
 * @returns the color according to the chosen criteriums.
 */
const GetAspectColor = (node: Node | LibItem, colorType: AspectColorType, isTransparent?: boolean) => {
  if (isTransparent) {
    if (IsFunction(node)) return "rgba(251, 201, 19, 0.1)";
    if (IsProduct(node)) return "rgba(6, 144, 152, 0.1)";
    if (IsLocation(node)) return "rgba(163, 0, 167, 0.1)";
  }

  if (colorType === AspectColorType.Main) return GetMainColor(node);
  if (colorType === AspectColorType.Selected) return GetSelectedColor(node);
  if (colorType === AspectColorType.Header) return GetHeaderColor(node);
  if (colorType === AspectColorType.Tab) return GetTabColor(node);
};

function GetMainColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FUNCTION_MAIN;
  if (IsProduct(node)) return Color.PRODUCT_MAIN;
  if (IsLocation(node)) return Color.LOCATION_MAIN;
}

function GetSelectedColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FUNCTION_SELECTED;
  if (IsProduct(node)) return Color.PRODUCT_SELECTED;
  if (IsLocation(node)) return Color.LOCATION_SELECTED;
}

function GetHeaderColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FUNCTION_HEADER;
  if (IsProduct(node)) return Color.PRODUCT_HEADER;
  if (IsLocation(node)) return Color.LOCATION_HEADER;
}

function GetTabColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FUNCTION_TAB;
  if (IsProduct(node)) return Color.PRODUCT_TAB;
  if (IsLocation(node)) return Color.LOCATION_TAB;
}

export default GetAspectColor;
