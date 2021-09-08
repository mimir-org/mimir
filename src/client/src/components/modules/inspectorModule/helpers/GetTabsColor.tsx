import { Color } from "../../../../compLibrary";
import { Edge, Node } from "../../../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../../flow/helpers/common";

const GetTabsColor = (node: Node | null, edge: Edge | null) => {
  if (node) {
    if (IsFunction(node)) return Color.FunctionSelected;
    if (IsLocation(node)) return Color.LocationTab;
    if (IsProduct(node)) return Color.ProductInspector;
  }
  if (edge) {
    if (IsFunction(edge.fromNode)) return Color.FunctionSelected;
    if (IsLocation(edge.fromNode)) return Color.LocationTab;
    if (IsProduct(edge.fromNode)) return Color.ProductInspector;
  }
};

export default GetTabsColor;
