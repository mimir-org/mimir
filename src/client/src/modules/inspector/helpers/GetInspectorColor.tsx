import { Color } from "../../../compLibrary";
import { IsFunction, IsLocation, IsProduct } from "../../../helpers";
import { IsCreateLibraryType, IsEdge, IsNode } from "./IsType";
import { InspectorElement } from "../types";

const GetInspectorColor = (element: InspectorElement): string => {
  if (IsNode(element) || IsCreateLibraryType(element)) {
    if (IsFunction(element)) return Color.FunctionHeader;
    if (IsLocation(element)) return Color.LocationHeader;
    if (IsProduct(element)) return Color.ProductHeader;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FunctionHeader;
    if (IsLocation(element.fromNode)) return Color.LocationHeader;
    if (IsProduct(element.fromNode)) return Color.ProductHeader;
  }

  return null;
};

export default GetInspectorColor;
