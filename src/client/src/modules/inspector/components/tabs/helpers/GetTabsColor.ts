import { Color } from "../../../../../compLibrary/colors/Color";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { InspectorElement } from "../../../types";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";

export const GetTabsColor = (element: InspectorElement) => {
  if (IsNode(element) || IsCreateLibraryType(element)) {
    if (IsFunction(element)) return Color.FUNCTION_TAB;
    if (IsLocation(element)) return Color.LOCATION_TAB;
    if (IsProduct(element)) return Color.PRODUCT_TAB;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FUNCTION_TAB;
    if (IsLocation(element.fromNode)) return Color.LOCATION_TAB;
    if (IsProduct(element.fromNode)) return Color.PRODUCT_TAB;
  }
};
