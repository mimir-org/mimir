import { LibNode, Node } from "../../models/project";
import { Color } from "../../componentLibrary";
import {
  IsFunctionNode,
  IsProductNode,
  IsLocationNode,
} from "../../components/flow/helpers/common";

const GetAspectColor = (
  node: Node | LibNode,
  isTransparent: boolean
): string => {
  if (isTransparent) {
    if (IsFunctionNode(node)) return Color.FunctionTransparent;
    if (IsProductNode(node)) return Color.ProductTransparent;
    if (IsLocationNode(node)) return Color.LocationTransparent;
  } else {
    if (IsFunctionNode(node)) return Color.Function;
    if (IsProductNode(node)) return Color.Product;
    if (IsLocationNode(node)) return Color.Location;
  }
  return null;
};

export default GetAspectColor;
