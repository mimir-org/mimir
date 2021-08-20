import { Color } from "../../compLibrary";
import { LibItem, Node } from "../../models";
import {
  IsFunction,
  IsProduct,
  IsLocation,
} from "../../components/flow/helpers/common";

const GetAspectColor = (node: Node | LibItem, isTransparent: boolean) => {
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
