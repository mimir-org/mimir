import { Color } from "../../../../../compLibrary";
import { Node } from "../../../../../models";
import { IsLocation, IsFunction, IsProduct } from "../../../helpers";

const GetMenuColor = (node: Node) => {
  if (IsLocation(node)) return Color.LocationSelected;
  if (IsFunction(node)) return Color.FunctionSelected;
  if (IsProduct(node)) return Color.ProductSelected;
};

export default GetMenuColor;
