import { Color } from "../../../../../compLibrary/colors";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { InspectorElement } from "../../../types";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";

export const GetTabsColor = (element: InspectorElement) => {
  if (IsNode(element) || IsCreateLibraryType(element)) {
    if (IsFunction(element)) return Color.FunctionTab;
    if (IsLocation(element)) return Color.LocationTab;
    if (IsProduct(element)) return Color.ProductTab;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FunctionTab;
    if (IsLocation(element.fromNode)) return Color.LocationTab;
    if (IsProduct(element.fromNode)) return Color.ProductTab;
  }
};
