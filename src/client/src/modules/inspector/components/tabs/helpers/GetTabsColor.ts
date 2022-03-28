import { Color } from "../../../../../compLibrary/colors/Color";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { InspectorElement } from "../../../types";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";

export const GetTabsColor = (element: InspectorElement) => {
  if (IsNode(element) || IsCreateLibraryType(element)) {
    if (IsFunction(element)) return Color.JASMINE;
    if (IsLocation(element)) return Color.PINK;
    if (IsProduct(element)) return Color.DARK_TURQUOISE;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.JASMINE;
    if (IsLocation(element.fromNode)) return Color.PINK;
    if (IsProduct(element.fromNode)) return Color.DARK_TURQUOISE;
  }
};
