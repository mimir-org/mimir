import { IsFunction, IsLocation, IsProduct } from "../../../helpers";
import { Color } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const GetParentColor = (node: Node) => {
  if (IsLocation(node)) return Color.LocationHeader;
  if (IsFunction(node)) return Color.FunctionHeader;
  if (IsProduct(node)) return Color.ProductHeader;
};

export default GetParentColor;
