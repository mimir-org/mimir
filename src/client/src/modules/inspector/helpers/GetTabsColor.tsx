import { Color } from "../../../compLibrary";
import { IsFunction, IsLocation, IsProduct } from "../../../components/flow/helpers";
import { InspectorElement } from "../types";
import { IsNode, IsEdge } from "./IsType";

const GetTabsColor = (element: InspectorElement) => {
  if (IsNode(element)) {
    if (IsFunction(element)) return Color.FunctionTab;
    if (IsLocation(element)) return Color.LocationTab;
    if (IsProduct(element)) return Color.ProductTab;
  }

  if (IsEdge(element)) {
    if (IsFunction(element.fromNode)) return Color.FunctionTab;
    if (IsLocation(element.fromNode)) return Color.LocationTab;
    if (IsProduct(element.fromNode)) return Color.ProductTab;
  }
};

export default GetTabsColor;
