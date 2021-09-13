import { Color } from "../../../compLibrary";
import { Node, Edge } from "../../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../../components/flow/helpers/common";

const GetInspectorColor = (node: Node, edge: Edge) => {
  if (node) {
    if (IsFunction(node)) return Color.FunctionHeader;
    if (IsLocation(node)) return Color.LocationHeader;
    if (IsProduct(node)) return Color.ProductHeader;
  }
  if (edge) {
    if (IsFunction(edge.fromNode)) return Color.FunctionHeader;
    if (IsLocation(edge.fromNode)) return Color.LocationHeader;
    if (IsProduct(edge.fromNode)) return Color.ProductHeader;
  }
  return null;
};

export default GetInspectorColor;
