import { Color } from "../compLibrary";
import { LibItem, Node } from "../models";
import { IsFunction, IsLocation, IsProduct } from "./";

const GetAspectColor = (node: Node | LibItem, colorType: string, isTransparent?: boolean) => {
  if (isTransparent) {
    if (IsFunction(node)) return "rgba(251, 201, 19, 0.1)";
    if (IsProduct(node)) return "rgba(6, 144, 152, 0.1)";
    if (IsLocation(node)) return "rgba(163, 0, 167, 0.1)";
  }

  if (colorType === "main") return GetMainColor(node);
  if (colorType === "selected") return GetSelectedColor(node);
  if (colorType === "header") return GetHeaderColor(node);
  if (colorType === "tab") return GetTabColor(node);
};

function GetMainColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FunctionMain;
  if (IsProduct(node)) return Color.ProductMain;
  if (IsLocation(node)) return Color.LocationMain;
}

function GetSelectedColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FunctionSelected;
  if (IsProduct(node)) return Color.ProductSelected;
  if (IsLocation(node)) return Color.LocationSelected;
}

function GetHeaderColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FunctionHeader;
  if (IsProduct(node)) return Color.ProductHeader;
  if (IsLocation(node)) return Color.LocationHeader;
}

function GetTabColor(node: Node | LibItem) {
  if (IsFunction(node)) return Color.FunctionTab;
  if (IsProduct(node)) return Color.ProductTab;
  if (IsLocation(node)) return Color.LocationTab;
}

export default GetAspectColor;
