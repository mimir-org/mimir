import { Color } from "../../../compLibrary";
import { IsFunction, IsLocation, IsProduct } from "../../../components/flow/helpers";
import { IsEdge, IsNode } from "./IsType";
import { InspectorElement } from "../types";

const GetInspectorColor = (element: InspectorElement): string => {
  if (IsNode(element)) {
    if (IsFunction(element)) return Color.FunctionHeader;
    if (IsLocation(element)) return Color.LocationHeader;
    if (IsProduct(element)) return Color.ProductHeader;
  }
  if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FunctionHeader;
    if (IsLocation(element.fromNode)) return Color.LocationHeader;
    if (IsProduct(element.fromNode)) return Color.ProductHeader;
  }
  return null;
};

export default GetInspectorColor;
