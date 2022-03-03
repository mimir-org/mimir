import { Color } from "../../../../../compLibrary/colors";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { IsCreateLibraryType, IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

export const GetInspectorColor = (element: InspectorElement) => {
  if (IsNode(element) || IsCreateLibraryType(element)) {
    if (IsFunction(element)) return Color.FUNCTION_HEADER;
    if (IsLocation(element)) return Color.LOCATION_HEADER;
    if (IsProduct(element)) return Color.PRODUCT_HEADER;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FUNCTION_HEADER;
    if (IsLocation(element.fromNode)) return Color.LOCATION_HEADER;
    if (IsProduct(element.fromNode)) return Color.PRODUCT_HEADER;
  }

  return null;
};
