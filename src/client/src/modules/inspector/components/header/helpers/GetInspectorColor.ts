import { Color } from "../../../../../compLibrary/colors/Color";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

export const GetInspectorColor = (element: InspectorElement) => {
  if (IsNode(element)) {
    if (IsFunction(element)) return Color.LEMON_YELLOW_CRAYOLA;
    if (IsLocation(element)) return Color.PINK_LACE;
    if (IsProduct(element)) return Color.CELESTE;
  } else if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.LEMON_YELLOW_CRAYOLA;
    if (IsLocation(element.fromNode)) return Color.PINK_LACE;
    if (IsProduct(element.fromNode)) return Color.CELESTE;
  }

  return null;
};
