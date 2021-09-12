import { Color } from "../../../compLibrary";
import { Edge, Node } from "../../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../../components/flow/helpers/common";

const GetTabsColor = (node: Node | null, edge: Edge | null) => {
  if (node) {
    if (IsFunction(node)) return Color.FunctionTab;
    if (IsLocation(node)) return Color.LocationTab;
    if (IsProduct(node)) return Color.ProductTab;
  }
  if (edge) {
    if (IsFunction(edge.fromNode)) return Color.FunctionTab;
    if (IsLocation(edge.fromNode)) return Color.LocationTab;
    if (IsProduct(edge.fromNode)) return Color.ProductTab;
  }
};

export default GetTabsColor;
