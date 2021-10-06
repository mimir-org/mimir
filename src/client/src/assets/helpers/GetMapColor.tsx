import { Color } from "../../compLibrary";
import { Node } from "../../models";
import { IsFunction, IsLocation, IsProduct } from "../../components/flow/helpers";

const GetMapColor = (node: Node): string => {
  if (IsFunction(node)) return Color.FunctionMain;
  if (IsProduct(node)) return Color.ProductMain;
  if (IsLocation(node)) return Color.LocationMain;
  return null;
};

export default GetMapColor;
