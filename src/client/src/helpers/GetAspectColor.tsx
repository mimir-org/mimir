import { Color } from "../compLibrary";
import { Node } from "../models";
import { IsFunction, IsLocation, IsProduct } from "./";

const GetAspectColor = (node: Node, colorType: string) => {
  if (colorType === "main") {
    if (IsFunction(node)) return Color.FunctionMain;
    if (IsProduct(node)) return Color.ProductMain;
    if (IsLocation(node)) return Color.LocationMain;
  }

  if (colorType === "selected") {
    if (IsFunction(node)) return Color.FunctionSelected;
    if (IsProduct(node)) return Color.ProductSelected;
    if (IsLocation(node)) return Color.LocationSelected;
  }

  if (colorType === "header") {
    if (IsFunction(node)) return Color.FunctionHeader;
    if (IsProduct(node)) return Color.ProductHeader;
    if (IsLocation(node)) return Color.LocationHeader;
  }

  if (colorType === "tab") {
    if (IsFunction(node)) return Color.FunctionTab;
    if (IsProduct(node)) return Color.ProductTab;
    if (IsLocation(node)) return Color.LocationTab;
  }
};

export default GetAspectColor;
