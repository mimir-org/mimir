import { Color } from "../../../../compLibrary";
import { Node, Edge } from "../../../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../../flow/helpers/common";

const GetInspectorColor = (node: Node, edge: Edge) => {
  if (node) {
    if (IsFunction(node)) return Color.FunctionTransparent;
    if (IsLocation(node)) return Color.LocationTransparent;
    if (IsProduct(node)) return Color.ProductTransparent;
  }
  if (edge) {
    if (IsFunction(edge.fromNode)) return Color.FunctionTransparent;
    if (IsLocation(edge.fromNode)) return Color.LocationTransparent;
    if (IsProduct(edge.fromNode)) return Color.ProductTransparent;
  }
  return null;
};

export default GetInspectorColor;
