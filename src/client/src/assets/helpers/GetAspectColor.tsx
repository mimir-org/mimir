import { LibraryNodeItem, Node } from "../../models/project";
import { Color } from "../../compLibrary";
import {
  IsFunction,
  IsProduct,
  IsLocation,
} from "../../components/flow/helpers/common";

const GetAspectColor = (
  node: Node | LibraryNodeItem,
  isTransparent: boolean
) => {
  if (isTransparent) {
    if (IsFunction(node)) return Color.FunctionTransparent;
    if (IsProduct(node)) return Color.ProductTransparent;
    if (IsLocation(node)) return Color.LocationTransparent;
  }
  if (IsFunction(node)) return Color.Function;
  if (IsProduct(node)) return Color.Product;
  if (IsLocation(node)) return Color.Location;
};

export default GetAspectColor;
